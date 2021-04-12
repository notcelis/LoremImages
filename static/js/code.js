function get_sizes(img){
    let ref = img.split('.')[2];
    let size = []
    size.push(parseInt(ref.split('/')[3]));
    size.push(parseInt(ref.split('/')[4]));
    return size;
}
function change_slide(obj, imgItems, imgPos){
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
    $('.slider li').hide();
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
    let random_animation = [];
    $('input#number').change(function(){
        
        imgItems = $(this).val();
        imgPos = 1;
        slides =  $('.slider li');
        $('ul.slider').empty();

        $('#imgs').empty();        
        let num = $(this).val();
        if(num >20){
            num = 20
            $(this).val(20);
        }
        for(let i = 0; i < num; i++){
            random_animation.push(animations[Math.floor((Math.random() * 10) + 1) - 1]);
        }

        for(let i = 0; i < num; i++){

            $.ajax({
                url: '/imgs',
                async: false,
                type: 'POST',
                dataType: 'json',
                success: function(response){
                    url = response[0];
                },
                error: function(error){
                    console.log('not ok', error);
                }
            });

            sizes = get_sizes(url);
            ancho = sizes[0];
            alto  = sizes[1];
            $('#imgs').append(`
                <div id='box' class="d-block"  `+ random_animation[i] +`>
                    <div id="box2">
                        
                            <img src="`+ url +`" loading="lazy">
                        
                        
                    </div>
                    <div class="container" id="sizes" style="background-color: black; height: 30px;">
                        <p class="font-weight-normal text-white text-center">
                        Ancho:` + ancho + ` Alto:` + alto + `
                        </p>
                    </div>
                </div>
                <div id="myModal" class="modal">
                    <span class="close">&times;</span>
                    <img class="modal-content" id="img01">
                    <div id="caption"></div>
                </div>
                `);
            
            if(ancho > alto){
                if(alto < 350){
                    $('img').last().css('heigth','350px');
                    $('img').last().css('width','auto');
                }else{
                    $('img').last().css('width','auto');
                    $('img').last().css('height','100%');
                }
            }else{//ancho < alto
                if(ancho < 350){//ancho < 350 --> 350< alto
                    $('img').last().css('width','350px');
                    $('img').last().css('height','auto');
                }else{//ancho > 350
                    $('img').last().css('width','100%');
                    $('img').last().css('height','auto');
                }
            }

            $('ul.slider').append(`
                <li>
                </li>
            `);
            let this_slide = $('.slider li').eq(i);
            this_slide.append(`
                <img src='`+ url +`' alt=''>
            `);
        }
        $('.slider li').hide(); 
        $('.slider li:first').show();
        
    });
    

    $('#refresh').click(function(){
        $('input#number').trigger('change');
    });
    $('input#number').trigger('change');
    var slides =  $('.slider li');
    slides.hide(); 
    $('.slider li:first').show();

    setInterval(function(){
        $('span')[1].trigger('click');
        }, 10000);
    /*
    *********************
            Library
    *********************




    */
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // Get the modal
    var modal = document.getElementById("myModal");

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
    modal.style.display = "none";
    }

    $('#box img').click(function(){
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var img = $(this);
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;

    });
   
   
});