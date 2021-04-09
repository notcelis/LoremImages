function get_sizes(img){
    let size = img.split('.')[2];
    size = 'Ancho:'+size.split('/')[3]+' Alto:' + size.split('/')[4];
    return size;
}
function change_slide(obj, imgItems, imgPos, slider){
    let direction = 1;
    
    if($(obj).parent().attr('class') == 'left'){
        direction = -1;
    }
    switch(direction){
        case 1:
            if( imgPos >= imgItems){
                imgPos = 1;
            }else{
                imgPos++;
            }
            break;
        case -1:
            if( imgPos <= 1){
                imgPos = imgItems;
            }else{
                imgPos--;
            }
    }
    slider.hide();
    $('.slider li:nth-child('+ imgPos +')').fadeIn(); 
    return imgPos;
}

$(document).ready(function(){

    /*
    *********************
            Slider
    *********************
    */
    var imgItems = $('input#number').val(); 
    var imgPos = 1;
    $('div.left').hide();
    var slides =  $('.slider li');
    slides.hide(); 
    $('.slider li:first').show();
    
    $('span').click(function(){
        imgPos = change_slide(
            $(this),
            imgItems,
            imgPos,
            slides,
        );
        if(imgPos == imgItems){
            $('div.right').hide();
        }else{
            $('div.right').show();
        }
        if(imgPos == 1){
            $('div.left').hide();
        }else{
            $('div.left').show();
        }
    });

    /*
    *********************
            Slider
    *********************
    */
    /*
    *********************
            Library
    *********************
    */

    $('input#number').change(function(){
        imgItems = $(this).val()
        slides =  $('.slider li');
        slides.empty();

        $('#imgs').empty();        
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
                        `);
                    let this_slide =  $('.slider li').eq(i);
                    this_slide.append(`
                        <img src='`+ url +`' alt=''>
                        `);
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
    /*
    *********************
            Library
    *********************
    */
});