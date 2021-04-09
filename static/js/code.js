function get_sizes(img){
    let size = img.split('.')[2];
    size = 'Ancho:'+size.split('/')[3]+' Alto:' + size.split('/')[4];
    return size;
}
$(document).ready(function(){
    $('input#number').change(function(){
        $('#imgs').empty('slow');
        let num = $(this).val();
        if(num >10){
            num = 10
            $(this).val(10);
        }
        $.ajax({
            url: '/imgs',
            async: false,
            type: 'POST',
            data:{
                numero : num
              },
            dataType: 'json',
            success: function(response){
                let animations = [
                    "data-aos='zoom-in'",
                    "data-aos='zoom-in-up'",
                    "data-aos='zoom-in-down'",
                    "data-aos='zoom-in-left'",
                    "data-aos='zoom-in-right'",
                    "data-aos='zoom-out'",
                    "data-aos='zoom-out-up'",
                    "data-aos='zoom-out-down'",
                    "data-aos='zoom-out-left'",
                    "data-aos='zoom-out-right'"
                ]
               for(let i = 0; i<response.length; i++){
                    url = response[i];
                    sizes = get_sizes(url);
                    random_animation = animations[Math.floor((Math.random() * 10) + 1) - 1]
                    $('#imgs').append(`
                        <div id='box' class="d-inline-block" `+ random_animation +`>
                            <a href='`+ url +`'>
                                <img style='border: 5px solid black;' src='`+ url +`' loading='lazy'>
                            </a>
                            <div class="container" style="background-color: black; height: 30px;">
                                <p class="font-weight-normal text-white text-center">
                                    `+ sizes+`
                                </p>
                            </div>
                        </div>
                        `)
                        .show('slow');

               }
            },
            error: function(error){
                console.log('not ok', error);

            }
        });
    });

    $('#refresh').click(function(){
        $('input#number').trigger('change');
    });
});