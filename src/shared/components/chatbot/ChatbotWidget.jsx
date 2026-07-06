/**
 * File source thuộc hệ thống FE ResearchPulse (Trending Dashboard).
 *
 * File: shared/components/chatbot/ChatbotWidget.jsx
 */
import React, { useRef, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import chatbotApi from '../../services/chatbotApi';
import './ChatbotWidget.css';

function GeminiMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" fill="currentColor"/>
    </svg>
  );
}

const numberLikeColumns = new Set([
  'publication_year',
  'citation_count',
  'value_float',
  'year',
]);

const MAX_CHAT_MESSAGE_LENGTH = 8000;
const CHAT_HISTORY_LIMIT = 10;

const initialAssistantMessage = {
  id: 'chatbot-welcome-message',
  role: 'assistant',
  answer:
    'Xin chào! Tôi là AI Research Assistant. Hãy hỏi tôi về bài báo, tạp chí, xếp hạng Q1-Q4 hoặc dữ liệu trong dự án của bạn.',
  table: null,
};

const suggestedPrompts = [
  'Tìm giúp tôi top các bài báo trong dự án này',
  'Danh sách tạp chí Q1 năm 2024',
  'Bài báo nào có lượt trích dẫn cao nhất?',
];

function getProjectIdFromUrl() {
  const match = window.location.pathname.match(/\/projects?\/(\d+)/);
  return match?.[1] ? Number(match[1]) : null;
}

function normalizeChatRole(role) {
  return String(role || '').toLowerCase() === 'user' ? 'user' : 'assistant';
}

function mapHistoryMessage(item) {
  return {
    id: `history-${item.message_id}`,
    role: normalizeChatRole(item.role),
    answer: item.content || '',
    table: null,
    createdAt: item.created_at,
  };
}

function renderMarkdownLite(text) {
  if (!text) return null;

  return text.split('\n').map((line, lineIndex) => {
    const fragments = line.split(/(\*\*.*?\*\*)/g).map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`${lineIndex}-${partIndex}`}>{part.slice(2, -2)}</strong>;
      }
      return <span key={`${lineIndex}-${partIndex}`}>{part}</span>;
    });

    return (
      <span key={`line-${lineIndex}`}>
        {fragments}
        {lineIndex < text.split('\n').length - 1 && <br />}
      </span>
    );
  });
}

export default function ChatbotWidget() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [projectId, setProjectId] = useState(() => getProjectIdFromUrl());
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([initialAssistantMessage]);
  const [loadedProjectId, setLoadedProjectId] = useState(null);
  const scrollAnchorRef = useRef(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  };

  useEffect(() => {
    setProjectId(getProjectIdFromUrl());
  }, [location]);

  const {
    data: historyResponse,
    isLoading: isHistoryLoading,
    error: historyQueryError,
  } = useQuery({
    queryKey: ['chat-history', projectId, CHAT_HISTORY_LIMIT],
    queryFn: () =>
      chatbotApi.getChatHistory(projectId, {
        limit: CHAT_HISTORY_LIMIT,
        offset: 0,
        order: 'desc',
      }),
    enabled: isOpen && Boolean(projectId),
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const historyError = !projectId && isOpen
    ? 'Vui lòng chọn dự án trước khi xem lịch sử chat.'
    : historyQueryError?.message || '';

  useEffect(() => {
    if (!isOpen) {
      setLoadedProjectId(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (!projectId) {
      setMessages([initialAssistantMessage]);
      setLoadedProjectId(null);
      return;
    }

    if (historyResponse?.data && loadedProjectId !== projectId) {
      const historyMessages = [...historyResponse.data].reverse().map(mapHistoryMessage);
      setMessages(historyMessages.length > 0 ? historyMessages : [initialAssistantMessage]);
      setLoadedProjectId(projectId);
      scrollToBottom();
    }
  }, [historyResponse, isOpen, projectId, loadedProjectId]);

  const sendMessage = async (text = message) => {
    const cleanText = text.trim();
    if (!cleanText || isLoading) return;

    if (cleanText.length > MAX_CHAT_MESSAGE_LENGTH) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          answer: `Tin nhắn của bạn đang dài ${cleanText.length.toLocaleString('vi-VN')} ký tự. Vui lòng rút gọn còn tối đa ${MAX_CHAT_MESSAGE_LENGTH.toLocaleString('vi-VN')} ký tự trước khi gửi.`,
          table: null,
          isError: true,
        },
      ]);
      scrollToBottom();
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      answer: cleanText,
      table: null,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    scrollToBottom();

    if (!projectId) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            answer: 'Vui lòng chọn dự án trước khi hỏi AI.',
            table: null,
          },
        ]);
        setIsLoading(false);
        scrollToBottom();
      }, 500);
      return;
    }

    try {
      const data = await chatbotApi.sendMessage({
        project_id: Number(projectId),
        message: cleanText,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          answer: data?.answer || 'Tôi đã nhận phản hồi nhưng chưa có nội dung trả lời.',
          table: data?.table || null,
        },
      ]);

      queryClient.invalidateQueries({
        queryKey: ['chat-history', projectId, CHAT_HISTORY_LIMIT],
      });
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          answer: error.message?.includes('đăng nhập')
            ? `🔐 ${error.message}`
            : `Xin lỗi, tôi chưa thể kết nối tới API chatbot.\n\n**Chi tiết lỗi**: ${error.message}\n**Đang gọi tới**: ${chatbotApi.url}\n\nVui lòng kiểm tra tab Network để xem có bị CORS hoặc sai cổng Backend không.`,
          table: null,
          isError: true,
        },
      ]);
      console.error('ChatbotWidget error:', error);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className={`rp-chatbot ${isOpen ? 'is-open' : ''}`} aria-live="polite">
      {isOpen && (
        <div className="rp-chatbot__panel" role="dialog" aria-label="AI Research Assistant">
          <header className="rp-chatbot__header">
            <div className="rp-chatbot__identity">
              <div className="rp-chatbot__avatar">
                <GeminiMark size={20} />
              </div>
              <div>
                <p className="rp-chatbot__eyebrow">ResearchPulse RAG</p>
                <h2>AI Research Assistant</h2>
              </div>
            </div>
            <button
              id="chatbot-close-button"
              className="rp-chatbot__icon-btn"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng chatbot"
            >
              <IoMdClose size={20} />
            </button>
          </header>



          <div className="rp-chatbot__messages">
            {isHistoryLoading ? (
              <div className="rp-chatbot__history-loading" aria-label="Đang tải lịch sử chat">
                <span className="rp-chatbot__history-spinner" />
                <p>Đang tải lịch sử chat...</p>
              </div>
            ) : (
              <>
                {historyError && (
                  <article className="rp-chatbot__message rp-chatbot__message--assistant is-error">
                    <div className="rp-chatbot__bubble">🔐 {historyError}</div>
                  </article>
                )}

                {messages.map((item) => (
                  <article
                    key={item.id}
                    className={`rp-chatbot__message rp-chatbot__message--${item.role} ${
                      item.isError ? 'is-error' : ''
                    }`}
                  >
                    <div className="rp-chatbot__bubble">{renderMarkdownLite(item.answer)}</div>

                    {item.table && (
                      <div className="rp-chatbot__table-card">
                        <div className="rp-chatbot__table-head">
                          <span>Bảng dữ liệu</span>
                          <small>{item.table.data?.length || 0} dòng</small>
                        </div>
                        <div className="rp-chatbot__table-wrap">
                          <table>
                            <thead>
                              <tr>
                                {item.table.columns?.map((column) => (
                                  <th key={column.key}>{column.label}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {item.table.data?.map((row, rowIndex) => (
                                <tr key={row.article_id || row.journal_id || `row-${rowIndex}`}>
                                  {item.table.columns?.map((column) => (
                                    <td
                                      key={`${rowIndex}-${column.key}`}
                                      className={numberLikeColumns.has(column.key) ? 'is-number' : ''}
                                    >
                                      {row[column.key] ?? '—'}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </article>
                ))}

                {isLoading && (
                  <div className="rp-chatbot__typing" aria-label="AI đang trả lời">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </>
            )}
            <div ref={scrollAnchorRef} />
          </div>

          {messages.length <= 1 && (
            <div className="rp-chatbot__suggestions" aria-label="Gợi ý câu hỏi">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isLoading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form
            className="rp-chatbot__composer"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <div className="rp-chatbot__input-wrap">
              <textarea
                id="chatbot-message-input"
                value={message}
                maxLength={MAX_CHAT_MESSAGE_LENGTH}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi về bài báo, tạp chí, xếp hạng Q1-Q4..."
                rows="2"
              />
              <span className={`rp-chatbot__char-count ${message.length >= MAX_CHAT_MESSAGE_LENGTH ? 'is-limit' : ''}`}>
                {message.length.toLocaleString('vi-VN')}/{MAX_CHAT_MESSAGE_LENGTH.toLocaleString('vi-VN')}
              </span>
            </div>
            <button id="chatbot-send-button" type="submit" disabled={isLoading || !message.trim()}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button
        id="chatbot-toggle-button"
        className="rp-chatbot__launcher"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Thu nhỏ chatbot' : 'Mở chatbot AI'}
      >
        <span className="rp-chatbot__pulse" />
        <span className="rp-chatbot__launcher-icon">
          <GeminiMark size={18} />
        </span>
        <span className="rp-chatbot__launcher-text">AI Chat</span>
      </button>
    </section>
  );
}
