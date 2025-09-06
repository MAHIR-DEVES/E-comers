document.addEventListener("DOMContentLoaded", function() {
    var backToTopBtn = document.querySelector('.backtop-btn');

    function toggleButtonVisibility() {
      if (window.scrollY > 200) { // Adjust the value as needed
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Show/hide button on scroll
    window.addEventListener('scroll', toggleButtonVisibility);

    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function(event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initial check
    toggleButtonVisibility();
    
   //mobile
      $('#autoWidth').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
          $('#autoWidth').removeClass('cS-hidden');
        }
      }); 
     
      // Initialize the slider for kitchen products
    $('#autoWidthKitchen').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
            $('#autoWidthKitchen').removeClass('cS-hidden');
        }
    });
    $('#autoWidthGrocery').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
            $('#autoWidthGrocery').removeClass('cS-hidden');
        }
    });
    //for tshirt
    $('#autoWidthTshirt').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
            $('#autoWidthTshirt').removeClass('cS-hidden');
        }
    });
    //for saree
    $('#autoWidthSaree').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
            $('#autoWidthSaree').removeClass('cS-hidden');
        }
    });
    //for dress
    $('#autoWidthDress').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
            $('#autoWidthDress').removeClass('cS-hidden');
        }
    });
    // Gadget
    $('#autoWidthGadget').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
            $('#autoWidthGadget').removeClass('cS-hidden');
        }
    });
    // Organic
    $('#autoWidthOrganic').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function() {
            $('#autoWidthOrganic').removeClass('cS-hidden');
        }
    });

    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.addEventListener('click', function() {
        if (mobileMenu.classList.contains('d-none')) {
            mobileMenu.classList.remove('d-none');
        } else {
            mobileMenu.classList.add('d-none');
        }
    });

    });