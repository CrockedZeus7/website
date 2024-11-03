    function filterBooths() {
      const floor = document.getElementById('floor-category').value;
      const type = document.getElementById('type-category').value;
      const booths = document.querySelectorAll('.booth-card');

      booths.forEach(booth => {
        const boothFloor = booth.getAttribute('data-floor');
        const boothType = booth.getAttribute('data-type');

        if ((floor === 'all' || boothFloor === floor) && (type === 'all' || boothType === type)) {
          booth.style.display = 'block';
        } else {
          booth.style.display = 'none';
        }
      });
    }
