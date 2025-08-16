// مراحل التذكرة
    const TICKET_STAGES = [
      { id: 'new', label: 'جديدة' },
      { id: 'review', label: 'قيد المراجعة' },
      { id: 'in_progress', label: 'قيد التنفيذ' },
      { id: 'resolved', label: 'تم الحل' }
    ];
    
    // فريق الدعم
    const SUPPORT_TEAM = [
      { id: 1, name: 'أحمد محمد', role: 'مدير الدعم' },
      { id: 2, name: 'محمد علي', role: 'فني دعم' },
      { id: 3, name: 'فاطمة حسن', role: 'فني دعم' },
      { id: 4, name: 'عمر خالد', role: 'فني دعم' }
    ];
    
    // تحميل التذاكر من localStorage
    function loadTickets() {
      return JSON.parse(localStorage.getItem('supportTickets')) || [];
    }
    
    // تحديث الإحصائيات
    function updateStats() {
      const tickets = loadTickets();
      
      const newCount = tickets.filter(t => t.status === 'new').length;
      const pendingCount = tickets.filter(t => t.status === 'review').length;
      const progressCount = tickets.filter(t => t.status === 'in_progress').length;
      const resolvedCount = tickets.filter(t => t.status === 'resolved').length;
      
      document.getElementById('newCount').textContent = newCount;
      document.getElementById('pendingCount').textContent = pendingCount;
      document.getElementById('progressCount').textContent = progressCount;
      document.getElementById('resolvedCount').textContent = resolvedCount;
    }
    
    // عرض التذاكر في الجدول
    function renderTickets() {
      const tickets = loadTickets();
      const ticketsList = document.getElementById('ticketsList');
      const emptyState = document.getElementById('emptyState');
      
      // تحديث الإحصائيات
      updateStats();
      
      // مسح الجدول الحالي
      ticketsList.innerHTML = '';
      
      if (tickets.length === 0) {
        emptyState.classList.remove('d-none');
        return;
      }
      
      emptyState.classList.add('d-none');
      
      // تطبيق الفلاتر
      const statusFilter = document.getElementById('statusFilter').value;
      const priorityFilter = document.getElementById('priorityFilter').value;
      const searchTerm = document.getElementById('ticketSearch').value.toLowerCase();
      
      const filteredTickets = tickets.filter(ticket => {
        const matchesStatus = statusFilter ? ticket.status === statusFilter : true;
        const matchesPriority = priorityFilter ? ticket.impact === priorityFilter : true;
        const matchesSearch = searchTerm ? 
          ticket.id.toLowerCase().includes(searchTerm) || 
          ticket.issue.toLowerCase().includes(searchTerm) : true;
        
        return matchesStatus && matchesPriority && matchesSearch;
      });
      
      // عرض التذاكر المصفاة
      filteredTickets.forEach(ticket => {
        const row = document.createElement('tr');
        row.className = 'ticket-item';
        row.setAttribute('data-id', ticket.id);
        
        // الحالة والأولوية
        const statusClass = `status-${ticket.status === 'resolved' ? 'resolved' : 
                            ticket.status === 'in_progress' ? 'in-progress' : 
                            ticket.status === 'review' ? 'pending' : 'new'}`;
        
        const priorityClass = ticket.impact === 'High' ? 'badge-high' : 
                             ticket.impact === 'Medium' ? 'badge-medium' : 'badge-low';
        
        row.innerHTML = `
          <td><span class="ticket-id">${ticket.id}</span></td>
          <td>مستخدم نظام</td>
          <td>${ticket.title}</td>
          <td>${ticket.category}</td>
          <td><span class="ticket-badge ${priorityClass}">${ticket.impact}</span></td>
          <td><span class="status-badge ${statusClass}">${TICKET_STAGES.find(s => s.id === ticket.status)?.label || ticket.status}</span></td>
          <td>${ticket.date}</td>
          <td>
            <button class="btn btn-sm btn-outline-primary view-ticket">
              <i class="fas fa-eye"></i> عرض
            </button>
          </td>
        `;
        
        ticketsList.appendChild(row);
      });
      
      // إضافة مستمعي الأحداث لأزرار العرض
      document.querySelectorAll('.view-ticket').forEach(button => {
        button.addEventListener('click', function() {
          const ticketId = this.closest('tr').getAttribute('data-id');
          openTicketDetails(ticketId);
        });
      });
    }
    
    // فتح تفاصيل التذكرة في نافذة منبثقة
    function openTicketDetails(ticketId) {
      const tickets = loadTickets();
      const ticket = tickets.find(t => t.id === ticketId);
      
      if (!ticket) return;
      
      // إزالة النشط من جميع الصفوف
      document.querySelectorAll('.ticket-item').forEach(row => {
        row.classList.remove('active');
      });
      
      // إضافة النشط للصف الحالي
      const currentRow = document.querySelector(`.ticket-item[data-id="${ticketId}"]`);
      if (currentRow) {
        currentRow.classList.add('active');
      }
      
      // حالة التذكرة
      const statusOptions = TICKET_STAGES.map(stage => `
        <option value="${stage.id}" ${ticket.status === stage.id ? 'selected' : ''}>
          ${stage.label}
        </option>
      `).join('');
      
      // فريق الدعم
      const teamOptions = SUPPORT_TEAM.map(member => `
        <option value="${member.id}" ${ticket.assignedTo === member.id ? 'selected' : ''}>
          ${member.name} (${member.role})
        </option>
      `).join('');
      
      // ملاحظات الدعم
      const supportNotes = ticket.notes ? ticket.notes.map(note => `
        <div class="note-item mb-3">
          <div class="d-flex justify-content-between mb-1">
            <strong>${note.agent}</strong>
            <span class="text-muted">${note.date}</span>
          </div>
          <div class="p-3 bg-light rounded">${note.content}</div>
        </div>
      `).join('') : '<p class="text-muted">لا توجد ملاحظات</p>';
      
      // بناء محتوى النافذة المنبثقة
      document.getElementById('ticketModalTitle').textContent = `التذكرة: ${ticket.id}`;
      document.getElementById('ticketModalBody').innerHTML = `
        <div class="row">
          <div class="col-md-8">
            <div class="mb-4">
              <h6>تفاصيل المشكلة</h6>
              <div class="p-3 bg-light rounded">
                <p><strong>العنوان:</strong> ${ticket.title}</p>
                <p><strong>الوصف:</strong> ${ticket.issue}</p>
                <p><strong>النوع:</strong> ${ticket.category}</p>
                <p><strong>الأولوية:</strong> ${ticket.impact}</p>
                <p><strong>تاريخ الإنشاء:</strong> ${ticket.date}</p>
              </div>
            </div>
            
            <div class="mb-4">
              <h6>ملاحظات فريق الدعم</h6>
              <div id="supportNotes">
                ${supportNotes}
              </div>
              
              <div class="mt-3">
                <label for="newNote" class="form-label">إضافة ملاحظة جديدة</label>
                <textarea class="form-control" id="newNote" rows="3" placeholder="أدخل ملاحظاتك..."></textarea>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="mb-4">
              <h6>تغيير حالة التذكرة</h6>
              <select class="form-select mb-2" id="ticketStatus">
                ${statusOptions}
              </select>
            </div>
            
            <div class="mb-4">
              <h6>تعيين لفني</h6>
              <select class="form-select mb-2" id="ticketAssignee">
                <option value="">غير معين</option>
                ${teamOptions}
              </select>
            </div>
            
            <div class="mb-4">
              <h6>معلومات الجهاز</h6>
              <div class="p-3 bg-light rounded small">
                <p><strong>نوع الجهاز:</strong> ${ticket.device.model}</p>
                <p><strong>نظام التشغيل:</strong> ${ticket.device.os}</p>
                <p><strong>دقة الشاشة:</strong> ${ticket.device.resolution}</p>
              </div>
            </div>
          </div>
        </div>
        <input type="hidden" id="currentTicketId" value="${ticketId}">
      `;
      
      // فتح النافذة المنبثقة
      const modal = new bootstrap.Modal(document.getElementById('ticketModal'));
      modal.show();
    }
    
    // حفظ التغييرات على التذكرة
    function saveTicketChanges() {
      const tickets = loadTickets();
      // الحصول على معرف التذكرة من الحقل المخفي
      const ticketId = document.getElementById('currentTicketId').value;
      if (!ticketId) return;
      
      const ticketIndex = tickets.findIndex(t => t.id === ticketId);
      if (ticketIndex === -1) return;
      
      // تحديث حالة التذكرة
      tickets[ticketIndex].status = document.getElementById('ticketStatus').value;
      
      // تعيين الفني
      const assigneeId = document.getElementById('ticketAssignee').value;
      tickets[ticketIndex].assignedTo = assigneeId || null;
      
      // إضافة ملاحظة جديدة
      const newNote = document.getElementById('newNote').value.trim();
      if (newNote) {
        if (!tickets[ticketIndex].notes) {
          tickets[ticketIndex].notes = [];
        }
        
        tickets[ticketIndex].notes.push({
          agent: 'أحمد محمد',
          date: new Date().toLocaleString('ar-EG'),
          content: newNote
        });
      }
      
      // حفظ في localStorage
      localStorage.setItem('supportTickets', JSON.stringify(tickets));
      
      // تحديث العرض
      renderTickets();
      
      // إغلاق النافذة المنبثقة
      const modal = bootstrap.Modal.getInstance(document.getElementById('ticketModal'));
      modal.hide();
    }
    
    // تهيئة الصفحة عند التحميل
    document.addEventListener('DOMContentLoaded', function() {
      // تحميل وعرض التذاكر
      renderTickets();
      
      // تحديث التذاكر عند النقر على زر التحديث
      document.getElementById('refreshTickets').addEventListener('click', renderTickets);
      
      // تطبيق الفلاتر عند التغيير
      document.getElementById('statusFilter').addEventListener('change', renderTickets);
      document.getElementById('priorityFilter').addEventListener('change', renderTickets);
      document.getElementById('ticketSearch').addEventListener('input', renderTickets);
      
      // مستمع حدث لحفظ التغييرات
      document.getElementById('saveTicketBtn').addEventListener('click', saveTicketChanges);
      
      // إضافة بعض التذاكر للعرض التجريبي إذا لم تكن موجودة
      if (loadTickets().length === 0) {
        const sampleTickets = [
          {
            id: 'TKT-1001',
            title: "لا يمكن تسجيل الدخول إلى النظام",
            issue: "عند محاولة تسجيل الدخول باستخدام بياناتي الصحيحة، أحصل على رسالة خطأ تفيد بأن كلمة المرور غير صحيحة.",
            category: "account",
            impact: "High",
            date: "٢٠ أكتوبر ٢٠٢٣, ١٠:٣٠ ص",
            status: "new",
            device: {
              model: "كمبيوتر محمول",
              os: "Windows",
              resolution: "1920 × 1080"
            }
          },
          {
            id: 'TKT-1002',
            title: "مشكلة في معالجة الدفع",
            issue: "عند محاولة إتمام عملية دفع، تظهر رسالة خطأ تفيد بأن عملية الدفع لم تكتمل.",
            category: "payment",
            impact: "Medium",
            date: "١٩ أكتوبر ٢٠٢٣, ٢:١٥ م",
            status: "review",
            device: {
              model: "كمبيوتر مكتبي",
              os: "MacOS",
              resolution: "2560 × 1440"
            },
            assignedTo: 2,
            notes: [
              {
                agent: "محمد علي",
                date: "١٩ أكتوبر ٢٠٢٣, ٣:٠٠ م",
                content: "تم مراجعة المشكلة، يبدو أن هناك مشكلة في تكامل نظام الدفع. قمت بتحويل التذكرة لفريق التطوير."
              }
            ]
          },
          {
            id: 'TKT-1003',
            title: "طلب إضافة ميزة تصدير التقارير",
            issue: "أرغب في إمكانية تصدير التقارير بصيغة PDF مع الحفاظ على التنسيق الحالي.",
            category: "feature",
            impact: "Low",
            date: "١٨ أكتوبر ٢٠٢٣, ١١:٠٠ ص",
            status: "in_progress",
            device: {
              model: "جهاز لوحي",
              os: "iPadOS",
              resolution: "2048 × 1536"
            },
            assignedTo: 3
          }
        ];
        
        localStorage.setItem('supportTickets', JSON.stringify(sampleTickets));
        renderTickets();
      }
    });