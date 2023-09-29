$(window).on('orderFormUpdated.vtex', function (e, orderForm) {

  if (!vtexjs.checkout.orderForm.openTextField) {
    vtexjs.checkout.sendAttachment('openTextField', { value: " " });
  }

  setTimeout(function () {
    $('.mini-cart .quantity.badge').each(function () {
      var $_this = $(this);
      $_this.text(parseInt($_this.text()));

    })

    $('.item-attachments-content.item-attachments-name-personalizacao').each(function () {
      var $_this = $(this);
      var $_itemAttachmentsImage = $_this.find('.item-attachments-item-fields')

      if ($(".item-attachments-item-fields img").length <= 2) {
        var _thumb = $_this.find('.item-attachment-name-thumb input').val()
        $_itemAttachmentsImage.prepend($('<img>', { 'src': _thumb }))
      }


      $_this.prev().prev().addClass('has-attachment');
      $(this).find('textarea').attr('disabled', 'disabled')
    })



  }, 500)


})






$(window).on('hashchange', function () {
  vtexjs.checkout.getOrderForm()

});

$(document).ready(function () {
  vtexjs.checkout.getOrderForm()
})


$(window).load(function () {
  vtexjs.checkout.getOrderForm()
});




$(document).ready(function () {
  setInterval(() => {
    $("#ship-number").attr("maxlength", 15)
    $("#ship-complement").attr("maxlength", 70)
  }, 1000)


  if (window.location.href.indexOf("cart") != -1) {
    $(".logo-site-seguro .content a").append(`<img src='/arquivos/icones1.svg'/>`);
    $(".cart-template-holder").prepend("<div style='display: flex;align-items: stretch;margin-bottom: 2em;'><img src='/arquivos/cart.svg' style='height: 34px;    margin-right: 1em;'><h1 style='font-size: 26px;'>Meu Carrinho</h1></div>")

  }



  window.onhashchange = function () {
    if ($(".logo-site-seguro .content a")) {
      $(".logo-site-seguro .content a").html("");
    }

    if (window.location.href.indexOf("cart") != -1) {
      $(".logo-site-seguro .content a").append(`<img src='/arquivos/icones1.svg'/> `)

    } else if (window.location.href.indexOf("profile") != -1) {
      $(".logo-site-seguro .content a").append(`<img src='/arquivos/icones2.svg'/> `)
    } else if (window.location.href.indexOf("shipping") != -1) {
      $(".logo-site-seguro .content a").append(`<img src='/arquivos/icones3.svg'/> `)
    } else if (window.location.href.indexOf("payment") != -1) {
      $(".logo-site-seguro .content a").append(`<img src='/arquivos/icones4.svg'/> `)
    }
  }


  setTimeout(function () {

    $(".srp-result").append("<p  style='margin-top:10px'>Clique abaixo para ver todas as opções</p>")

    /*  $(".srp-delivery-current-many__price").append(`
  <svg style='transform: translate(4px) rotate(-90deg);position: relative;top: 8px;' xmlns="http://www.w3.org/2000/svg" width="19.523" height="30.523" viewBox="0 0 39.523 50.523">
  <path fill="none" stroke="rgb(227,80,60)" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="5" d="M27.76157527 11.76157527l-16 14 16 13"/>
  </svg>
  
  `);
  
  $(".srp-delivery-current-many__price").css({"margin-top":"-15px"})*/



  }, 1000)

  setTimeout(function () {
    jQuery(function ($) {

      $("#quantoFalta").html(function () {

        return $(this).html().replace(".", ",");

      });
    });
  }, 10000);





  const totalfrete = 300;

  function getdevileryprice() {

    if (window.location.href.indexOf("cart") != -1) {
      //console.log(orderForm);

      /*let currentPrice = orderForm.totalizers[0].value;
      currentPrice = currentPrice.toString().replace(/\B(?=(\d{2})+(?!\d))/g, '.');
      currentPrice =  Number(currentPrice);*/

      let currentPrice = $(".summary-template-holder .summary-totalizers table .monetary").html()
      currentPrice = currentPrice.replace(/,/g, '.').replace(/[\sR$]+/g, '');
      if (currentPrice.length > 6) {
        let segregator = currentPrice.split(".")
        currentPrice = `${segregator[0]}${segregator[1]}.${segregator[2]}`
      }

      currentPrice = Number(currentPrice);


      let qtdUntilGoal = totalfrete - currentPrice;
      qtdUntilGoal = qtdUntilGoal.toFixed(2)
      let percentage = 0;
      $(".myprogressbar").remove()
      if (qtdUntilGoal <= 0) {
        percentage = 100
        qtdUntilGoal = 0

        $(".summary-totalizers").append(`
  <div class="myprogressbar">
  <label for="file" style="color: #0CBC5F;    margin-top: 2em;line-height: 22px;font-size: 12px;">
  <svg xmlns="http://www.w3.org/2000/svg" width="27.172" height="18.824" viewBox="0 0 27.172 18.824" style="    margin-bottom: -5px;">
    <g>
      <path fill="rgb(12,188,95)" fill-rule="evenodd" d="M15.92834913 0H.46848086C.20974602 0 0 .21088569 0 .47102637V11.7756592h15.92834913V0z"/>
      <path fill="rgb(12,188,95)" fill-rule="evenodd" d="M24.82946777 8.9494751h-.10302734l-.96032715-3.86706543c-.2602539-1.04882813-1.19702148-1.78491211-2.2722168-1.78521729h-4.62854003v13.1887207h1.44763183c.2355957 1.35211182 1.40344238 2.33850098 2.76867676 2.33850098 1.36535644 0 2.53320312-.98638916 2.76867676-2.33850097h.97912597c1.29370118 0 2.34240723-1.05444336 2.34240723-2.35510254v-2.82617188c0-1.30072021-1.04870605-2.35516357-2.34240723-2.35516357zm-6.09020996.94207763H22.899292c.14648438.0043335.28649903-.06048584.37841797-.1751709.09204102-.11462402.12536621-.26593017.0900879-.40893554L22.4309082 5.5392578c-.05285644-.21533203-.24804687-.36444092-.46850586-.35797119h-3.22314453c-.25878906 0-.46850586.21087647-.46850586.4710083V9.4204834c0 .26019287.2097168.47106933.46850586.47106933zm2.34240723 8.0074463c-1.03491211 0-1.87390137-.84350587-1.87390137-1.88409424 0-1.04052735.83898926-1.88409424 1.87390137-1.88409424 1.0349121 0 1.87390137.8435669 1.87390137 1.88409424 0 1.04058837-.83898926 1.88409423-1.87390137 1.88409423z"/>
      <path fill="rgb(12,188,95)" fill-rule="evenodd" d="M15.92834473 16.48591309H7.92199707c-.2355957 1.35211181-1.40344238 2.33850097-2.76867676 2.33850097-1.36535644 0-2.53320312-.98638916-2.76879883-2.33850097h-.04211425C1.04870605 16.48591309 0 15.43153076 0 14.13081055V12.7177246h15.92834473v3.76818848zM5.1533203 14.13081055c-1.0349121 0-1.87390136.8435669-1.87390136 1.88409424 0 1.04058837.83898925 1.88409423 1.87390136 1.88409423s1.87390137-.84350586 1.87390137-1.88409423c0-1.04052735-.83898926-1.88409424-1.87390137-1.88409424z"/>
      <ellipse cx="5.153" cy="16.015" fill="rgb(12,188,95)" rx=".703" ry=".707"/>
      <ellipse cx="21.082" cy="16.015" fill="rgb(12,188,95)" rx=".703" ry=".707"/>
    </g>
  </svg>
  
  
  <span id="quantoFalta" style="font-weight: 900;">Você ganhou o frete grátis!</span><br/> (Válido para Sul e Sudeste*)<br/>*Somente produtos elegíveis.</label>
  <progress id="file" value="${percentage}" max="100">  </progress>
  
  <style>
  #file{
      width: 100%;
      height: 15px;
      margin-top: 14px;
      border-radius: 0;
      -webkit-appearance: none;
      appearance: none;
  }
  
  #file[value]::-webkit-progress-bar {
      background-color: #F2F2F2;
    
    }
  
    #file[value]::-webkit-progress-value {
      background-color: #0CBC5F;
    
    }
  
  <style>
  </div>
  
  
  `)

      } else {
        percentage = (100 * currentPrice) / totalfrete;
        $(".summary-totalizers").append(`
<div class="myprogressbar">
<label for="file" style="color: #0CBC5F;    margin-top: 2em;line-height: 22px;font-size: 12px;">
<svg xmlns="http://www.w3.org/2000/svg" width="27.172" height="18.824" viewBox="0 0 27.172 18.824" style="    margin-bottom: -5px;">
<g>
  <path fill="rgb(12,188,95)" fill-rule="evenodd" d="M15.92834913 0H.46848086C.20974602 0 0 .21088569 0 .47102637V11.7756592h15.92834913V0z"/>
  <path fill="rgb(12,188,95)" fill-rule="evenodd" d="M24.82946777 8.9494751h-.10302734l-.96032715-3.86706543c-.2602539-1.04882813-1.19702148-1.78491211-2.2722168-1.78521729h-4.62854003v13.1887207h1.44763183c.2355957 1.35211182 1.40344238 2.33850098 2.76867676 2.33850098 1.36535644 0 2.53320312-.98638916 2.76867676-2.33850097h.97912597c1.29370118 0 2.34240723-1.05444336 2.34240723-2.35510254v-2.82617188c0-1.30072021-1.04870605-2.35516357-2.34240723-2.35516357zm-6.09020996.94207763H22.899292c.14648438.0043335.28649903-.06048584.37841797-.1751709.09204102-.11462402.12536621-.26593017.0900879-.40893554L22.4309082 5.5392578c-.05285644-.21533203-.24804687-.36444092-.46850586-.35797119h-3.22314453c-.25878906 0-.46850586.21087647-.46850586.4710083V9.4204834c0 .26019287.2097168.47106933.46850586.47106933zm2.34240723 8.0074463c-1.03491211 0-1.87390137-.84350587-1.87390137-1.88409424 0-1.04052735.83898926-1.88409424 1.87390137-1.88409424 1.0349121 0 1.87390137.8435669 1.87390137 1.88409424 0 1.04058837-.83898926 1.88409423-1.87390137 1.88409423z"/>
  <path fill="rgb(12,188,95)" fill-rule="evenodd" d="M15.92834473 16.48591309H7.92199707c-.2355957 1.35211181-1.40344238 2.33850097-2.76867676 2.33850097-1.36535644 0-2.53320312-.98638916-2.76879883-2.33850097h-.04211425C1.04870605 16.48591309 0 15.43153076 0 14.13081055V12.7177246h15.92834473v3.76818848zM5.1533203 14.13081055c-1.0349121 0-1.87390136.8435669-1.87390136 1.88409424 0 1.04058837.83898925 1.88409423 1.87390136 1.88409423s1.87390137-.84350586 1.87390137-1.88409423c0-1.04052735-.83898926-1.88409424-1.87390137-1.88409424z"/>
  <ellipse cx="5.153" cy="16.015" fill="rgb(12,188,95)" rx=".703" ry=".707"/>
  <ellipse cx="21.082" cy="16.015" fill="rgb(12,188,95)" rx=".703" ry=".707"/>
</g>
</svg>


Faltam <span id="quantoFalta" style="font-weight: 900;">R$ ${qtdUntilGoal}</span> para você ter <strong style="font-weight: 900;">Frete Grátis</strong><br/> (Válido para Sul e Sudeste*)<br/>*Somente produtos elegíveis.</label>
<progress id="file" value="${percentage}" max="100">  </progress>

<style>
#file{
  width: 100%;
  height: 15px;
  margin-top: 14px;
  border-radius: 0;
  -webkit-appearance: none;
  appearance: none;
}

#file[value]::-webkit-progress-bar {
  background-color: #F2F2F2;

}

#file[value]::-webkit-progress-value {
  background-color: #0CBC5F;

}

<style>
</div>


`)
      }





    }




  }

  setInterval(function () {
    if (window.location.href.indexOf("cart") == -1) {
      $(".myprogressbar").remove()
    }
  }, 1000)

  getdevileryprice()

  $(window).on("orderFormUpdated.vtex", (a, obj) => {
    getdevileryprice()


    /* if($(".srp-delivery-current-many__price svg").length == 0){
       $(".srp-delivery-current-many__price").append(`
    <svg style='transform: translate(4px) rotate(-90deg);position: relative;top: 8px;' xmlns="http://www.w3.org/2000/svg" width="19.523" height="30.523" viewBox="0 0 39.523 50.523">
    <path fill="none" stroke="rgb(227,80,60)" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="5" d="M27.76157527 11.76157527l-16 14 16 13"/>
    </svg>
    
    `);
    
    $(".srp-delivery-current-many__price").css({"margin-top":"-15px"})
    }*/



  })


const removeSpecialchars = (selectors)=>{

  selectors.forEach(el=>{
    $(el).on( "change", function() {
      $(el).val($(el).val().replace(/[^a-zA-Z0-9 ]/g, ''))
    } );
   
  })

}

let valuesInput =[
  "#client-first-name",
  "#client-last-name",
  "#client-company-name",
  "#client-company-nickname",
  "#ship-number",
  "#ship-complement"
]
removeSpecialchars(valuesInput)





});

    
    var d=document,g=d.createElement("script"),s=d.getElementsByTagName("script")[0];g.async=!0,g.src="https://cdn-te.e-goi.com/tng/vtex-te.min.js",g.setAttribute("client_id","1587694"),g.setAttribute("list_id","1"),s.parentNode.insertBefore(g,s)


var script = document.createElement("script");
script.src = "https://www.mercadopago.com/v2/security.js";
script.setAttribute("output", "vtex.deviceFingerprint");
script.setAttribute("view", "checkout");
document.body.appendChild(script);




