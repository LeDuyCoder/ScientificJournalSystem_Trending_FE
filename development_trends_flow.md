# Luồng hoạt động (Data Flow) - Màn hình Development & Trends (Dựa trên Project)

Tài liệu này mô tả chi tiết luồng hoạt động lấy dữ liệu phân tích của tính năng **Development & Trends** dựa trên từng dự án cụ thể thông qua tham số `project_id` trên URL trình duyệt.

---

## 🗺️ Sơ đồ Luồng Hoạt động (Flow Diagram)

```mermaid
sequenceDiagram
    autonumber
    actor User as Người dùng (FE)
    participant Page as DevelopmentTrendsPage
    participant ServiceFE as developmentTrends.service (FE)
    participant Controller as analytics.controller (BE)
    participant ServiceBE as developmentTrends.service (BE)
    database PG as PostgreSQL (DB)
    database Neo4j as Neo4j Graph (DB)

    User->>Page: Truy cập /dashboard?project_id=2 và chọn tab "Development & Trends"
    Page->>ServiceFE: Gọi fetchDevelopmentTrendsData(filters)
    Note over ServiceFE: ServiceFE đọc project_id từ URL:<br/>new URLSearchParams(window.location.search)
    ServiceFE->>Controller: GET /analytics/development-trends?project_id=2&timeframe=...
    Controller->>ServiceBE: Gọi getDevelopmentTrends(query)
    
    rect rgb(240, 248, 255)
        Note over ServiceBE: 1. Đọc và lấy Scope của Project 2 trong Postgres
        ServiceBE->>PG: Gọi getProjectScope(client, project_id)
        PG-->>ServiceBE: Trả về: mappedDomain (Biochemistry), topicNames (keywords của project)
    end

    par Lấy dữ liệu 5 thành phần phân tích dựa trên Project Scope
        ServiceBE->>PG: [Publication Trend] Lọc theo project_id (categories & keywords của project)
        ServiceBE->>Neo4j: [Citation Mirroring] Lọc các bài viết thuộc các topic thuộc keywords của project
        ServiceBE->>PG: [Topic Evolution] Lấy top 3 Topics thuộc danh sách categories của project
        ServiceBE->>Neo4j: [Frontier Detection] Lọc và tính điểm các topic thuộc keywords của project
        ServiceBE->>PG: [Forecast Insights] Gọi getForecastInsights(project_id) phân tích bộ từ khóa
    end

    ServiceBE-->>Controller: Tổng hợp dữ liệu phân tích của Project (JSON)
    Controller-->>ServiceFE: Trả về JSON Response (HTTP 200)
    ServiceFE-->>Page: Cập nhật State và render các thẻ Biểu đồ
```

---

## 🔍 Chi tiết luồng xử lý nhận `project_id` từ URL

### 1. Phía Frontend (Client)
Khi người dùng đang mở một dự án cụ thể, URL trình duyệt sẽ dạng:
`http://localhost:5173/dashboard?project_id=2` (hoặc `projectId=2`).

Service của Frontend (`developmentTrends.service.js`) sẽ tự động đọc tham số này:
```javascript
const searchParams = new URLSearchParams(window.location.search);
const projectId = searchParams.get('project_id') || searchParams.get('projectId');
```
Sau đó, Frontend gửi yêu cầu lên Backend kèm theo tham số dự án:
```http
GET /analytics/development-trends?project_id=2&timeframe=Last+5+Years
```

---

### 2. Phía Backend (Server)

#### Bước A: Đọc Project Scope từ PostgreSQL
Nếu Backend nhận được `project_id`, nó sẽ gọi hàm `getProjectScope(client, project_id)` để giải quyết:
- **`mappedDomain`**: Lấy ngành nghiên cứu chính của dự án (ví dụ: `Computer Science` hoặc `Biochemistry`).
- **`topicNames`**: Lấy danh sách tên tất cả các từ khóa/lĩnh vực mà người dùng đã đánh dấu thuộc dự án này (`Project_Keyword`).
- **`projectCategoryIds`**: Lấy danh sách ID các danh mục con thuộc dự án.

#### Bước B: Phân tích và lọc dữ liệu dựa trên Project Scope
Hệ thống sử dụng các thông số thu thập được từ bước A để khoanh vùng phân tích:
1. **Publication Trend**: Lọc đếm bài báo có chứa các keyword và danh mục con nằm trong phạm vi dự án.
2. **Citation Mirroring**: Đo lường tỷ lệ trích dẫn chỉ với các bài viết có liên kết đến danh sách keyword được đánh dấu trong dự án.
3. **Topic Evolution**: Chọn ra top 3 chủ đề phổ biến nhất nằm trong nhóm danh mục của dự án và vẽ biểu đồ tiến trình.
4. **Frontier Detection**: Phân tích và chấm điểm độ bức phá của các công nghệ thuộc danh sách keyword của dự án.
5. **Future Forecast Insights**: Chạy mô hình dự báo trực tiếp cho `project_id` để phân tích độ bão hòa, đỉnh trích dẫn và các mối quan hệ chéo của dự án.
