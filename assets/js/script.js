
      $(document).ready(function(){
         $('.menu-toggle').click(function(){
             $('.menu-toggle').toggleClass('active')
             $('nav').toggleClass('active')
         })
      })
     
      var player = videojs('preview-player', {
        responsive: true,
        fluid: true
      });