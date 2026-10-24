(function () {
  // Mobile menu, matching the header toggle of the original React app.
  var toggle = document.querySelector('.menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    var iconMenu = toggle.querySelector('.lucide-menu');
    var iconClose = toggle.querySelector('.lucide-x');
    var setOpen = function (open) {
      mobileNav.hidden = !open;
      iconMenu.hidden = open;
      iconClose.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Luk menu' : 'Åbn menu');
    };
    toggle.addEventListener('click', function () {
      setOpen(mobileNav.hidden);
    });
    mobileNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
  }

  // Inquiry form: opens the message in the visitor's mail app.
  var form = document.querySelector('form.inquiry-form');
  var status = null;

  var hideStatus = function () {
    if (status) status.remove();
    status = null;
  };

  var showStatus = function (href) {
    if (!status) {
      status = document.createElement('div');
      status.className = 'email-status';
      status.setAttribute('role', 'status');
      form.appendChild(status);
    }
    status.textContent =
      'Din henvendelse er klar i din mailapp — den er ikke sendt endnu. ' +
      'Hvis mailappen ikke åbnede, ';
    var direct = document.createElement('a');
    direct.href = href;
    direct.textContent = 'åbn din email her';
    status.appendChild(direct);
    status.appendChild(document.createTextNode(' eller skriv til '));
    var mail = document.createElement('a');
    mail.href = 'mailto:kontakt@viewbymia.dk';
    mail.textContent = 'kontakt@viewbymia.dk';
    status.appendChild(mail);
    status.appendChild(document.createTextNode('.'));
  };

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var select = form.querySelector('#contact-interest');
      var interest = (select && select.value) || 'Indledende samtale';
      var body =
        'Navn: ' + (data.get('name') || '') + '\n' +
        'Email: ' + (data.get('email') || '') + '\n' +
        'Telefon: ' + (data.get('phone') || 'Ikke angivet') + '\n' +
        'Interesse: ' + interest + '\n\n' +
        (data.get('message') || '');
      var href =
        'mailto:kontakt@viewbymia.dk?subject=' +
        encodeURIComponent('Henvendelse — ' + interest) +
        '&body=' + encodeURIComponent(body);
      window.location.href = href;
      showStatus(href);
    });
  }

  // "Book denne pakke" preselects the package in the inquiry form.
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link || link.textContent.trim() !== 'Book denne pakke') return;
    var article = link.closest('article');
    var heading = article && article.querySelector('h3');
    var select = document.getElementById('contact-interest');
    if (heading && select) select.value = heading.textContent.trim();
    if (article) {
      article.querySelectorAll('details[open]').forEach(function (details) {
        details.open = false;
      });
    }
    hideStatus();
  });
})();
