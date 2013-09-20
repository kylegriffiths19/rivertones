</div>


                    <footer>
                        <div class="footer-wrap row gutters">
                        <section class='footer-container'>
                                <article class="col span_4">
                                    <img src="img/logo-small.png" alt=""/>
                                </article>
                                <article class="footer-tag col span_4">
                                    <p class="footer-text">E-mail: <a href="mailto:rivertones@hotmail.co.uk">Rivertones@hotmail.co.uk</a></p>
                                    <p class="footer-text">&copy; 2013 Rivertones Harmony Chorus</p>
                                </article>
                                <article class="col span_4">
                                    <a class="babs" href="http://www.singbarbershop.com/"><img src="img/babs-small.png" alt=""/></a>    
                                </article>
                        </section>
                        </div>
                    


        <script src="js/main.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script src="js/jquery.flexslider-min.js"></script> 
        <script src="js/html5shiv.js"></script>
        <script src="js/respond.min.js"></script>
        <script src="js/formalize.min.js"></script>

        
        
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBkfSl9lFTPDJexmx6BYYjT6sn_cF-HVzA&sensor=false">
        </script> 

        <!-- Flexslider -->
        <script type="text/javascript" charset="utf-8">
            $(window).load(function() {
                $('.flexslider').flexslider({
                    directionNav: true
                });
                
            });
        </script>

        <!-- Google maps -->
        <script>
            var map;
            function initialize() {
              var mapOptions = {
                zoom: 16,
                center: new google.maps.LatLng(51.00582, -3.12147),
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };

              map = new google.maps.Map(document.getElementById('map-holder'),
                  mapOptions);
              var marker = new google.maps.Marker({
                position: new google.maps.LatLng(51.00582, -3.12147),
                map: map
            });
            }

            google.maps.event.addDomListener(window, 'load', initialize);

        </script>


    </footer>
      
    </body>

</html>

