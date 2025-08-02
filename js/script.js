document.addEventListener('click', function (event) {
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.getElementById('navbarContent');

      const isClickInsideNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);

      if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
        const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
        collapseInstance.hide();
      }
    });