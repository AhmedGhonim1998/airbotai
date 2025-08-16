// مراحل التذكرة
    const TICKET_STAGES = [
      { id: 'new', label: 'مفتوحة' },
      { id: 'review', label: 'قيد المراجعة' },
      { id: 'in_progress', label: 'قيد التنفيذ' },
      { id: 'resolved', label: 'تم الحل' }
    ];
    
    // معلومات الجهاز
    let deviceInfo = {
      model: 'غير معروف',
      os: 'غير معروف',
      resolution: 'غير معروف'
    };
    
    // كشف معلومات الجهاز تلقائيًا
    function detectDeviceInfo() {
      try {
        // نظام التشغيل
        const userAgent = navigator.userAgent;
        let os = 'غير معروف';
        
        if (userAgent.includes('Win')) os = 'Windows';
        else if (userAgent.includes('Mac')) os = 'MacOS';
        else if (userAgent.includes('Linux')) os = 'Linux';
        else if (userAgent.includes('Android')) os = 'Android';
        else if (userAgent.includes('iOS')) os = 'iOS';
        
        // دقة الشاشة
        const resolution = `${screen.width} × ${screen.height}`;
        
        // نوع الجهاز
        const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
        const deviceType = isMobile ? 'هاتف/جهاز لوحي' : 'كمبيوتر';
        
        deviceInfo = {
          model: deviceType,
          os: os,
          resolution: resolution
        };
        
        // تحديث واجهة المستخدم
        document.getElementById('deviceModel').textContent = deviceInfo.model;
        document.getElementById('deviceOS').textContent = deviceInfo.os;
        document.getElementById('deviceResolution').textContent = deviceInfo.resolution;
        
      } catch (error) {
        console.error('Error detecting device info:', error);
      }
    }
    
    // Generate unique ID for tickets
    function generateTicketId() {
      return 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    }
    
    // Get current date in arabic format
    function getCurrentDate() {
      const now = new Date();
      return now.toLocaleString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // Format date string to Arabic
    function formatDateString(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('ar-EG', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    // Check if deadline is near or urgent
    function getDeadlineStatus(deadline) {
      if (!deadline) return '';
      
      const deadlineDate = new Date(deadline);
      const today = new Date();
      const timeDiff = deadlineDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (daysDiff < 0) {
        return 'deadline-urgent'; // Deadline passed
      } else if (daysDiff <= 2) {
        return 'deadline-near'; // Deadline within 2 days
      }
      return '';
    }
    
    // Save ticket to localStorage
    function saveTicket(ticket) {
      const tickets = JSON.parse(localStorage.getItem('supportTickets')) || [];
      tickets.unshift(ticket); // Add new ticket at the beginning
      localStorage.setItem('supportTickets', JSON.stringify(tickets));
      return tickets;
    }
    
    // Load tickets from localStorage
    function loadTickets() {
      return JSON.parse(localStorage.getItem('supportTickets')) || [];
    }
    
    // Render tickets list
    function renderTickets() {
      const tickets = loadTickets();
      const ticketsList = document.getElementById('ticketsList');
      const emptyState = document.getElementById('emptyState');
      
      // Update statistics
      const highCount = tickets.filter(t => t.impact === 'High' && t.status !== 'resolved').length;
      const mediumCount = tickets.filter(t => t.impact === 'Medium' && t.status !== 'resolved').length;
      const lowCount = tickets.filter(t => t.impact === 'Low' && t.status !== 'resolved').length;
      const resolvedCount = tickets.filter(t => t.status === 'resolved').length;
      
      document.getElementById('highCount').textContent = highCount;
      document.getElementById('mediumCount').textContent = mediumCount;
      document.getElementById('lowCount').textContent = lowCount;
      document.getElementById('resolvedCount').textContent = resolvedCount;
      
      // Clear current list
      ticketsList.innerHTML = '';
      
      if (tickets.length === 0) {
        emptyState.classList.remove('d-none');
        return;
      }
      
      emptyState.classList.add('d-none');
      
      // Render each ticket
      tickets.forEach(ticket => {
        const impactClass = `impact-${ticket.impact.toLowerCase()}`;
        const badgeClass = `badge-${ticket.impact.toLowerCase()}`;
        const statusClass = `status-${ticket.status === 'resolved' ? 'resolved' : 
                            ticket.status === 'in_progress' ? 'in-progress' : 
                            ticket.status === 'review' ? 'pending' : 'new'}`;
        const resolvedClass = ticket.status === 'resolved' ? 'resolved-ticket' : '';
        const deadlineStatus = getDeadlineStatus(ticket.deadline);
        
        const li = document.createElement('li');
        li.className = `list-group-item ticket-item ${impactClass} ${resolvedClass}`;
        li.innerHTML = `
          <button class="delete-btn" data-id="${ticket.id}">
            <i class="fas fa-trash"></i>
          </button>
          <div class="d-flex justify-content-between align-items-start">
            <div class="ticket-info flex-grow-1">
              <h5 class="mb-1">${ticket.title}</h5>
              <p class="mb-1 text-muted">${ticket.issue.substring(0, 70)}${ticket.issue.length > 70 ? '...' : ''}</p>
              <div class="d-flex mt-2">
                <span class="badge ${badgeClass} badge-impact me-2">${ticket.impact}</span>
                <span class="ticket-status ${statusClass}">${TICKET_STAGES.find(s => s.id === ticket.status)?.label || ticket.status}</span>
              </div>
            </div>
            <div class="ticket-meta text-end">
              <div class="ticket-id">${ticket.id}</div>
              <div class="text-muted small">${ticket.date}</div>
              ${ticket.deadline ? `<div class="deadline-badge ${deadlineStatus}"><i class="fas fa-clock me-1"></i>${formatDateString(ticket.deadline)}</div>` : ''}
            </div>
          </div>
          <div class="ticket-details d-none">
            <p><strong>التفاصيل:</strong> ${ticket.issue}</p>
            <p><strong>النوع:</strong> ${ticket.category}</p>
            ${ticket.deadline ? `<p><strong>موعد الانتهاء:</strong> <span class="${deadlineStatus}">${formatDateString(ticket.deadline)}</span></p>` : ''}
            
            <div class="progress-tracker">
              <div class="tracker-title">مراحل التذكرة:</div>
              <div class="tracker-steps">
                ${TICKET_STAGES.map((stage, index) => `
                  <div class="tracker-step 
                    ${ticket.status === stage.id ? 'step-active' : ''}
                    ${index < TICKET_STAGES.findIndex(s => s.id === ticket.status) ? 'step-done' : ''}">
                    <div class="step-icon">${index + 1}</div>
                    <div class="step-label">${stage.label}</div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div class="device-info">
              <h6>معلومات الجهاز:</h6>
              <div class="device-details">
                <div class="device-detail">
                  <i class="fas fa-laptop me-1"></i>
                  <span>${ticket.device.model}</span>
                </div>
                <div class="device-detail">
                  <i class="fas fa-window-maximize me-1"></i>
                  <span>${ticket.device.os}</span>
                </div>
                <div class="device-detail">
                  <i class="fas fa-desktop me-1"></i>
                  <span>${ticket.device.resolution}</span>
                </div>
              </div>
            </div>
            
            <div class="action-buttons">
              <button class="btn btn-sm btn-outline-danger delete-ticket" data-id="${ticket.id}">
                <i class="fas fa-trash me-1"></i>حذف التذكرة
              </button>
              ${ticket.status !== 'resolved' ? `
                
                
                <button class="btn btn-sm btn-resolve update-status" data-id="${ticket.id}" data-status="resolved">
                  <i class="fas fa-check-circle me-1"></i>تم الحل
                </button>
              ` : ''}
            </div>
          </div>
        `;
        
        ticketsList.appendChild(li);
        
        // Add click event to show/hide details
        li.querySelector('.ticket-info').addEventListener('click', function() {
          const details = li.querySelector('.ticket-details');
          details.classList.toggle('d-none');
        });
        
        // Add hover effects
        li.addEventListener('mouseenter', () => {
          li.style.transform = 'translateX(-5px)';
          li.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        });
        
        li.addEventListener('mouseleave', () => {
          li.style.transform = 'translateX(0)';
          li.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
        });
      });
      
      // Add delete functionality (top delete button)
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function(e) {
          e.stopPropagation();
          const ticketId = this.getAttribute('data-id');
          if (confirm('هل أنت متأكد من رغبتك في حذف هذه التذكرة؟')) {
            deleteTicket(ticketId);
          }
        });
      });
      
      // Add delete functionality (inside details)
      document.querySelectorAll('.delete-ticket').forEach(button => {
        button.addEventListener('click', function(e) {
          e.stopPropagation();
          const ticketId = this.getAttribute('data-id');
          if (confirm('هل أنت متأكد من رغبتك في حذف هذه التذكرة؟')) {
            deleteTicket(ticketId);
          }
        });
      });
      
      // Add update status functionality
      document.querySelectorAll('.update-status').forEach(button => {
        button.addEventListener('click', function(e) {
          e.stopPropagation();
          const ticketId = this.getAttribute('data-id');
          const newStatus = this.getAttribute('data-status');
          updateTicketStatus(ticketId, newStatus);
        });
      });
    }
    
    // Delete a ticket
    function deleteTicket(ticketId) {
      const tickets = loadTickets();
      const filteredTickets = tickets.filter(ticket => ticket.id !== ticketId);
      localStorage.setItem('supportTickets', JSON.stringify(filteredTickets));
      renderTickets();
    }
    
    // Delete all tickets
    function deleteAllTickets() {
      if (confirm('هل أنت متأكد من رغبتك في حذف جميع التذاكر؟')) {
        localStorage.removeItem('supportTickets');
        renderTickets();
      }
    }
    
    // Update ticket status
    function updateTicketStatus(ticketId, newStatus) {
      const tickets = loadTickets();
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === ticketId) {
          return { ...ticket, status: newStatus };
        }
        return ticket;
      });
      
      localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
      renderTickets();
    }
    
    // Form submission handler
    document.getElementById('ticketForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const title = document.getElementById('title').value.trim();
      const issue = document.getElementById('issue').value.trim();
      const category = document.getElementById('category').value;
      const impact = document.getElementById('impact').value;
      const deadline = document.getElementById('deadline').value || null;
      
      if (title && issue && category && impact) {
        const ticket = {
          id: generateTicketId(),
          title,
          issue,
          category,
          impact,
          deadline,
          date: getCurrentDate(),
          status: 'new',
          device: deviceInfo
        };
        
        saveTicket(ticket);
        this.reset();
        renderTickets();
        
        // Show success message
        alert('تم إرسال التذكرة بنجاح! سيتم مراجعتها من قبل فريق الدعم الفني.');
      } else {
        alert('الرجاء ملء جميع الحقول المطلوبة!');
      }
    });
    
    // Refresh tickets button
    document.getElementById('refreshTickets').addEventListener('click', function() {
      renderTickets();
      // Show refresh animation
      this.querySelector('i').classList.add('fa-spin');
      setTimeout(() => {
        this.querySelector('i').classList.remove('fa-spin');
      }, 1000);
    });
    
    // Delete all tickets button
    document.getElementById('deleteAllBtn').addEventListener('click', function() {
      deleteAllTickets();
    });
    
    // Clear deadline button
    document.getElementById('clearDeadline').addEventListener('click', function() {
      document.getElementById('deadline').value = '';
    });
    
    // Search functionality
    document.getElementById('ticketSearch').addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const tickets = document.querySelectorAll('.ticket-item');
      
      tickets.forEach(ticket => {
        const title = ticket.querySelector('.ticket-info h5').textContent.toLowerCase();
        const content = ticket.querySelector('.ticket-info p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          ticket.style.display = '';
        } else {
          ticket.style.display = 'none';
        }
      });
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-buttons .btn').forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-buttons .btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.textContent;
        const tickets = document.querySelectorAll('.ticket-item');
        
        tickets.forEach(ticket => {
          if (filter === 'الكل') {
            ticket.style.display = '';
          } else if (filter === 'مواعيد نهائية') {
            const hasDeadline = ticket.querySelector('.deadline-badge');
            if (hasDeadline) {
              ticket.style.display = '';
            } else {
              ticket.style.display = 'none';
            }
          } else {
            const impact = ticket.classList.contains('impact-high') ? 'عاجلة' : 
                          ticket.classList.contains('impact-medium') ? 'متوسطة' : 'بسيطة';
            
            if (impact === filter) {
              ticket.style.display = '';
            } else {
              ticket.style.display = 'none';
            }
          }
        });
      });
    });
    
    // Initialize the page
    document.addEventListener('DOMContentLoaded', function() {
      // Detect device info
      detectDeviceInfo();
      
      renderTickets();
      
      // Add sample tickets for demo if no tickets exist
      if (loadTickets().length === 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = tomorrow.toISOString().split('T')[0];
        
        const sampleTickets = [
          {
            id: generateTicketId(),
            title: "لا يمكن تسجيل الدخول إلى النظام",
            issue: "عند محاولة تسجيل الدخول باستخدام بياناتي الصحيحة، أحصل على رسالة خطأ تفيد بأن كلمة المرور غير صحيحة.",
            category: "account",
            impact: "High",
            deadline: formattedDate,
            date: getCurrentDate(),
            status: "review",
            device: {
              model: "كمبيوتر محمول",
              os: "Windows",
              resolution: "1920 × 1080"
            }
          },
          {
            id: generateTicketId(),
            title: "مشكلة في معالجة الدفع",
            issue: "عند محاولة إتمام عملية دفع، تظهر رسالة خطأ تفيد بأن عملية الدفع لم تكتمل.",
            category: "payment",
            impact: "Medium",
            date: getCurrentDate(),
            status: "in_progress",
            device: {
              model: "كمبيوتر مكتبي",
              os: "MacOS",
              resolution: "2560 × 1440"
            }
          },
          {
            id: generateTicketId(),
            title: "طلب إضافة ميزة تصدير التقارير",
            issue: "أرغب في إمكانية تصدير التقارير بصيغة PDF مع الحفاظ على التنسيق الحالي.",
            category: "feature",
            impact: "Low",
            date: getCurrentDate(),
            status: "resolved",
            device: {
              model: "جهاز لوحي",
              os: "iPadOS",
              resolution: "2048 × 1536"
            }
          }
        ];
        
        localStorage.setItem('supportTickets', JSON.stringify(sampleTickets));
        renderTickets();
      }
    });



  
  // ... الكود الحالي ...

  // ===== إضافة جديدة: نظام التزامن مع تحديثات فريق الدعم =====
  
  // دالة للتحقق من تحديثات التذاكر
  function checkForTicketUpdates() {
    const lastUpdate = localStorage.getItem('ticketsUpdated');
    const now = Date.now();
    
    // إذا مر أكثر من 30 ثانية منذ آخر تحقق
    if (!lastUpdate || now - lastUpdate > 30000) {
      localStorage.setItem('ticketsUpdated', now);
      
      // إعادة تحميل التذاكر من localStorage
      const updatedTickets = JSON.parse(localStorage.getItem('supportTickets')) || [];
      const currentTickets = loadTickets();
      
      // التحقق إذا كان هناك تغيير في التذاكر
      if (JSON.stringify(updatedTickets) !== JSON.stringify(currentTickets)) {
        // حفظ التذاكر المحدثة
        localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
        
        // إعادة عرض التذاكر
        renderTickets();
        
        // إظهار إشعار للمستخدم
        showNotification('تم تحديث حالة تذكرتك من قبل فريق الدعم!');
      }
    }
  }
  
  // دالة لعرض إشعار للمستخدم
  function showNotification(message) {
    // إنشاء عنصر الإشعار إذا لم يكن موجوداً
    if (!document.getElementById('updateNotification')) {
      const notification = document.createElement('div');
      notification.id = 'updateNotification';
      notification.style.position = 'fixed';
      notification.style.top = '20px';
      notification.style.right = '20px';
      notification.style.padding = '15px 25px';
      notification.style.backgroundColor = '#0f9d58';
      notification.style.color = 'white';
      notification.style.borderRadius = '10px';
      notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
      notification.style.zIndex = '10000';
      notification.style.transform = 'translateX(120%)';
      notification.style.transition = 'transform 0.4s ease';
      notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <span>${message}</span>
      `;
      document.body.appendChild(notification);
    }
    
    const notification = document.getElementById('updateNotification');
    notification.querySelector('span').textContent = message;
    
    // إظهار الإشعار
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
      
      // إخفاء الإشعار بعد 3 ثواني
      setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
      }, 3000);
    }, 100);
  }
  
  // التحقق من التحديثات كل 5 ثواني
  setInterval(checkForTicketUpdates, 5000);
  
  // التحقق من التحديثات عند تحميل الصفحة
  window.addEventListener('load', checkForTicketUpdates);
  
  // ===== نهاية الإضافة الجديدة =====
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', function() {
    // Detect device info
    detectDeviceInfo();
    
    renderTickets();
    
    // ... بقية الكود الحالي ...
  });