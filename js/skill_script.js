(function() {
  $(document).ready(function() {
    $('.skill-box').find('b').each(function(i) {
      return $(this).prop('Counter', 0).animate({
        Counter: $(this).parent().data('percent')
      }, {
        duration: 1500,
        easing: 'swing',
        step: function(now) {
          return $(this).text(Math.ceil(now) + '%');
        }
      });
    });
    return $('.skill-box .skills-circle li').each(function(i) {
      var _left, _percent, _right, deg, full_deg, run_duration;
      _right = $(this).find('.bar-circle-right');
      _left = $(this).find('.bar-circle-left');
      _percent = $(this).attr('data-percent');
      deg = 3.6 * _percent;
      if (_percent <= 50) {
        return _right.animate({
          circle_rotate: deg
        }, {
          step: function(deg) {
            $(this).css('transform', 'rotate(' + deg + 'deg)');
          },
          duration: 1000
        });
      } else {
        full_deg = 180;
        deg -= full_deg;
        run_duration = 1000 * (50 / _percent);
        return _right.animate({
          circle_rotate: full_deg
        }, {
          step: function(full_deg) {
            $(this).css('transform', 'rotate(' + full_deg + 'deg)');
          },
          duration: run_duration,
          easing: 'linear',
          complete: function() {
            run_duration -= 1500;
            _left.css({
              'clip': 'rect(0, 150px, 150px, 75px)',
              'background': '#7388d3'
            });
            return _left.animate({
              circle_rotate: deg
            }, {
              step: function(deg) {
                $(this).css('transform', 'rotate(' + deg + 'deg)');
              },
              duration: Math.abs(run_duration),
              easing: 'linear'
            });
          }
        });
      }
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixRQUFBLENBQUEsQ0FBQTtJQUNoQixDQUFBLENBQUUsWUFBRixDQUFlLENBQUMsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixRQUFBLENBQUMsQ0FBRCxDQUFBO2FBQzdCLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsU0FBYixFQUF3QixDQUF4QixDQUEwQixDQUFDLE9BQTNCLENBQW1DO1FBQy9CLE9BQUEsRUFBUyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsTUFBUixDQUFBLENBQWdCLENBQUMsSUFBakIsQ0FBc0IsU0FBdEI7TUFEc0IsQ0FBbkMsRUFHSTtRQUFBLFFBQUEsRUFBVSxJQUFWO1FBQ0EsTUFBQSxFQUFRLE9BRFI7UUFFQSxJQUFBLEVBQU0sUUFBQSxDQUFDLEdBQUQsQ0FBQTtpQkFDRixDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLElBQUksQ0FBQyxJQUFMLENBQVUsR0FBVixDQUFBLEdBQWlCLEdBQTlCO1FBREU7TUFGTixDQUhKO0lBRDZCLENBQS9CO1dBU0EsQ0FBQSxDQUFFLDhCQUFGLENBQWlDLENBQUMsSUFBbEMsQ0FBdUMsUUFBQSxDQUFDLENBQUQsQ0FBQTtBQUN6QyxVQUFBLEtBQUEsRUFBQSxRQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUE7TUFBSSxNQUFBLEdBQVMsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxtQkFBYjtNQUNULEtBQUEsR0FBUSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLGtCQUFiO01BQ1IsUUFBQSxHQUFXLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsY0FBYjtNQUNYLEdBQUEsR0FBTSxHQUFBLEdBQU07TUFDWixJQUFHLFFBQUEsSUFBWSxFQUFmO2VBQ0UsTUFBTSxDQUFDLE9BQVAsQ0FBZTtVQUFDLGFBQUEsRUFBZTtRQUFoQixDQUFmLEVBQ0U7VUFBQSxJQUFBLEVBQU0sUUFBQSxDQUFDLEdBQUQsQ0FBQTtZQUNKLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxHQUFSLENBQVksV0FBWixFQUF5QixTQUFBLEdBQVksR0FBWixHQUFrQixNQUEzQztVQURJLENBQU47VUFHQSxRQUFBLEVBQVU7UUFIVixDQURGLEVBREY7T0FBQSxNQUFBO1FBT0UsUUFBQSxHQUFXO1FBQ1gsR0FBQSxJQUFPO1FBQ1AsWUFBQSxHQUFlLElBQUEsR0FBTyxDQUFDLEVBQUEsR0FBRyxRQUFKO2VBQ3RCLE1BQU0sQ0FBQyxPQUFQLENBQWU7VUFBQyxhQUFBLEVBQWU7UUFBaEIsQ0FBZixFQUNFO1VBQUEsSUFBQSxFQUFNLFFBQUEsQ0FBQyxRQUFELENBQUE7WUFDSixDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsR0FBUixDQUFZLFdBQVosRUFBeUIsU0FBQSxHQUFZLFFBQVosR0FBdUIsTUFBaEQ7VUFESSxDQUFOO1VBR0EsUUFBQSxFQUFVLFlBSFY7VUFJQSxNQUFBLEVBQVEsUUFKUjtVQUtBLFFBQUEsRUFBVSxRQUFBLENBQUEsQ0FBQTtZQUNSLFlBQUEsSUFBZ0I7WUFDaEIsS0FBSyxDQUFDLEdBQU4sQ0FBVTtjQUFBLE1BQUEsRUFBUSw2QkFBUjtjQUFzQyxZQUFBLEVBQWE7WUFBbkQsQ0FBVjttQkFDQSxLQUFLLENBQUMsT0FBTixDQUFjO2NBQUMsYUFBQSxFQUFlO1lBQWhCLENBQWQsRUFDRTtjQUFBLElBQUEsRUFBTSxRQUFBLENBQUMsR0FBRCxDQUFBO2dCQUNKLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxHQUFSLENBQVksV0FBWixFQUF5QixTQUFBLEdBQVksR0FBWixHQUFrQixNQUEzQztjQURJLENBQU47Y0FHQSxRQUFBLEVBQVUsSUFBSSxDQUFDLEdBQUwsQ0FBUyxZQUFULENBSFY7Y0FJQSxNQUFBLEVBQVE7WUFKUixDQURGO1VBSFE7UUFMVixDQURGLEVBVkY7O0lBTHFDLENBQXZDO0VBVmdCLENBQWxCO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeSAtPlxuICAkKCcuc2tpbGwtYm94JykuZmluZCgnYicpLmVhY2ggKGkpIC0+XG4gICAgJCh0aGlzKS5wcm9wKCdDb3VudGVyJywgMCkuYW5pbWF0ZSB7XG4gICAgICAgIENvdW50ZXI6ICQodGhpcykucGFyZW50KCkuZGF0YSgncGVyY2VudCcpXG4gICAgfSxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGVhc2luZzogJ3N3aW5nJyxcbiAgICAgICAgc3RlcDogKG5vdykgLT5cbiAgICAgICAgICAgICQodGhpcykudGV4dCBNYXRoLmNlaWwobm93KSArICclJ1xuICAgICAgICAgIFxuICAkKCcuc2tpbGwtYm94IC5za2lsbHMtY2lyY2xlIGxpJykuZWFjaCAoaSkgLT5cbiAgICBfcmlnaHQgPSAkKHRoaXMpLmZpbmQoJy5iYXItY2lyY2xlLXJpZ2h0JylcbiAgICBfbGVmdCA9ICQodGhpcykuZmluZCgnLmJhci1jaXJjbGUtbGVmdCcpXG4gICAgX3BlcmNlbnQgPSAkKHRoaXMpLmF0dHIgJ2RhdGEtcGVyY2VudCdcbiAgICBkZWcgPSAzLjYgKiBfcGVyY2VudFxuICAgIGlmIF9wZXJjZW50IDw9IDUwXG4gICAgICBfcmlnaHQuYW5pbWF0ZSB7Y2lyY2xlX3JvdGF0ZTogZGVnfSxcbiAgICAgICAgc3RlcDogKGRlZykgLT5cbiAgICAgICAgICAkKHRoaXMpLmNzcyAndHJhbnNmb3JtJywgJ3JvdGF0ZSgnICsgZGVnICsgJ2RlZyknXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgZWxzZVxuICAgICAgZnVsbF9kZWcgPSAxODBcbiAgICAgIGRlZyAtPSBmdWxsX2RlZ1xuICAgICAgcnVuX2R1cmF0aW9uID0gMTAwMCAqICg1MC9fcGVyY2VudClcbiAgICAgIF9yaWdodC5hbmltYXRlIHtjaXJjbGVfcm90YXRlOiBmdWxsX2RlZ30sXG4gICAgICAgIHN0ZXA6IChmdWxsX2RlZykgLT5cbiAgICAgICAgICAkKHRoaXMpLmNzcyAndHJhbnNmb3JtJywgJ3JvdGF0ZSgnICsgZnVsbF9kZWcgKyAnZGVnKSdcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgZHVyYXRpb246IHJ1bl9kdXJhdGlvblxuICAgICAgICBlYXNpbmc6ICdsaW5lYXInXG4gICAgICAgIGNvbXBsZXRlOiAtPlxuICAgICAgICAgIHJ1bl9kdXJhdGlvbiAtPSAxMDAwXG4gICAgICAgICAgX2xlZnQuY3NzKCdjbGlwJzogJ3JlY3QoMCwgMTUwcHgsIDE1MHB4LCA3NXB4KScsJ2JhY2tncm91bmQnOicjQjBEQUI5JylcbiAgICAgICAgICBfbGVmdC5hbmltYXRlIHtjaXJjbGVfcm90YXRlOiBkZWd9LFxuICAgICAgICAgICAgc3RlcDogKGRlZykgLT5cbiAgICAgICAgICAgICAgJCh0aGlzKS5jc3MgJ3RyYW5zZm9ybScsICdyb3RhdGUoJyArIGRlZyArICdkZWcpJ1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGR1cmF0aW9uOiBNYXRoLmFicyhydW5fZHVyYXRpb24pXG4gICAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInXG4iXX0=
//# sourceURL=coffeescript