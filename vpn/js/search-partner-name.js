window.addEventListener('DOMContentLoaded', () => {
  window.partnerNames = window.partnerNames || [];
  window.shortcodesPartnersOnPage = window.shortcodesPartnersOnPage || [];

  if (
    window.dataLayer &&
    (window.shortcodesPartnersOnPage.length > 0 || window.partnerNames.length > 0)
  ) {
    window.dataLayer.push({
      'partnersOnPage': [...new Set([...window.shortcodesPartnersOnPage, ...window.partnerNames])]
    });
  }

});