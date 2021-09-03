$(document).on({//load gif 
    ajaxStart: function() { $body.addClass("loading");},
    ajaxStop: function() { $body.removeClass("loading");    
//mascaras para usar caso precisse 
 $('.date').mask('00/00/0000');
 $('.time').mask('00:00:00');
 $('.date_time').mask('00/00/0000 00:00:00');
 $('.cep').mask('00000-000');
 $('.phone').mask('0000-0000');
 $('.phone_with_ddd').mask('(00) 00000-0000');
 $('.rg').mask('99.999.999-9'); 
 $('.cpf').mask('000.000.000-00', {reverse: true});
 $('.phone_us').mask('(000) 000-0000');
 $('.mixed').mask('AAA 000-S0S');
 $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
 $('.money').mask('000.000.000.000.000,00', {reverse: true});
 $('.money2').mask("#.##0,00", {reverse: true});
 $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
   translation: {
     'Z': {
       pattern: /[0-9]/, optional: true
     }
   }
 });
 $('.ip_address').mask('099.099.099.099');
 $('.percent').mask('##0,00%', {reverse: true});
 $('.clear-if-not-match').mask("00/00/0000", {clearIfNotMatch: true});
 $('.placeholder').mask("00/00/0000", {placeholder: "__/__/____"});
 $('.fallback').mask("00r00r0000", {
     translation: {
       'r': {
         pattern: /[\/]/,
         fallback: '/'
       },
       placeholder: "__/__/____"
     }
   });
 $('.selectonfocus').mask("00/00/0000", {selectOnFocus: true});
}});

var jv = {

  datatable:function(dd){ //recebe array de idsClass para ponha datatable 
     for (let x = 0; x < dd.length; x++) {
        $('#'+dd[x]).DataTable({
            "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
            "sNext": "Próximo",
            "sPrevious": "Anterior",
            "sFirst": "Primeiro",
            "sLast": "Último"
            },
            "oAria": {
            "sSortAscending": ": Ordenar colunas de forma ascendente",
            "sSortDescending": ": Ordenar colunas de forma descendente"
            },
            "select": {
            "rows": {
                "_": "Selecionado %d linhas",
                "0": "Nenhuma linha selecionada",
                "1": "Selecionado 1 linha"
            }
            },
            "buttons": {
            "copy": "Copiar",
            "copyTitle": "Cópia bem sucedida",
            "copySuccess": {
                "1": "Uma linha copiada com sucesso",
                "_": "%d linhas copiadas com sucesso"
            }
            },
      },
        dom: 'Bfrtip',
                buttons: [
                    { extend: 'copy', className: 'btn btn-primary btn-fill ' },
                    { extend: 'csv', className: 'btn btn-primary btn-fill' },
                    { extend: 'excel', className: 'btn btn-primary btn-fill' },
                    { extend: 'pdf', className: 'btn btn-primary btn-fill' },
                    { extend: 'print', className: 'btn btn-primary btn-fill' },
                ]
          });
        }
     
  },

  datatable2:function(dd){ //recebe array de idsClass para ponha datatable 
     for (let x = 0; x < dd.length; x++) {
        $('#'+dd[x]).DataTable({
            "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch":'',
            "oPaginate": {
            "sNext": "Próximo",
            "sPrevious": "Anterior",
            "sFirst": "Primeiro",
            "sLast": "Último"
            },
            "oAria": {
            "sSortAscending": ": Ordenar colunas de forma ascendente",
            "sSortDescending": ": Ordenar colunas de forma descendente"
            },
            "select": {
            "rows": {
                "_": "Selecionado %d linhas",
                "0": "Nenhuma linha selecionada",
                "1": "Selecionado 1 linha"
            }
            },
            "buttons": {
            "copy": "Copiar",
            "copyTitle": "Cópia bem sucedida",
            "copySuccess": {
                "1": "Uma linha copiada com sucesso",
                "_": "%d linhas copiadas com sucesso"
            }
            },
      },         
      });
    }
     
  },

  

  formataDinheiroBR:function(val){
      return  val.toLocaleString('pt-BR', { minimumFractionDigits: 2});
  },

  formataDinheiroUSA:function(val){  
      if(val === 0 ){
        return val;
      }
      return parseFloat(val.split(".").join("").replace(",","."));   
  },

  injecthtml:function(html,el){
    document.getElementById(el).innerHTML = html;  
  },


  isvalid:function(item){
    for (let x in item) {
      let i = jv.qs(item[x]);
      if(!i){
      return Swal.fire(
            'Ops ....!',
            'Parece que esse Campo esta Vazio!<hr><br>Campo: <u><b>'+item[x]+'</b></u>',
            'warning'
          ),false
      }
    }
    return true;
  },
  isvalid2:function(item){
    for (let x in item) {
      if(!item[x]){
      return Swal.fire(
            'Ops ....!',
            'Parece que esse Campo esta Vazio!<hr><br>Campo: <u><b>'+x+'</b></u>',
            'warning'
          ),false
      }
    }
    return true;
  },

  insert:function(el,val){
    return document.querySelector('.'+el).value = val;
  },

  suporte:function(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Oops Desculpe algo não saiu como planejado Contate o suporte Tecnico!',
    })
  },

  maskDim:function(mas){ //recebe array de class para ponhar mask de dinheiro
    for (let x in mas) {
      let dim = '.'+mas[x]; 
      VMasker(document.querySelector(dim)).maskMoney();
    }
  },

  qsof:function(parms){
    return document.querySelectorAll('.'+parms);
  },

  qs:function(parms){
     return document.querySelector('.'+parms).value;
  },

  qsf:function(parms){
    return document.querySelector('.'+parms).files[0];
  },

  byIdSoma:function(parms){
    let res = document.getElementById(parms).value;
    return (res)?res:0;
  },

  isvalidTeF:function(item){
    for (let x in item) {
      if(!item[x]){
        return false;
      }
    }
    return true;
  },
  ID:function(){
      // Math.random deve ser único por causa de seu algoritmo de propagação.
      // Converta para a base 36 (números + letras) e pegue os primeiros 9 caracteres
      // após o decimal.
      return  Date.now().toString( 36 ).substr ( 2 ,  9 );
     
  },
  byID:function(parm,res){
    if(res){
      return document.getElementById(parm).value;
    }else{
      return document.getElementById(parm);
    }

    
  },

  limpaCampos:function() {
      var elements = document.getElementsByName("form_txt");
      elements.forEach(element => {
        console.log(element);
        element.value = '';
      })
  },

  formData:function(args){//recebe json
     var data = new FormData();
     for(let x in args){
       data.append(x,args[x]);
     }
     return data;
  },
  Ajax:async function(method,parms,url){
    if(['POST','DELETE','PUT'].indexOf(method)+1){
      if(parms){
        var req = await fetch(base+url,{
          method:method,
          header:new Headers({'Content-Type':'application/json'}),
          body:parms
        });
      }else{
        var req = await fetch(base+url,{
          method:method,
          header:new Headers({'Content-Type':'application/json'}),
        });
      }
      let res = await req.json();
      return res;
    }else{
       if(parms){
          var req = await fetch(base+url+ new URLSearchParams({
            parms
          }))
       }else{
          var req = await fetch(base+url);
       }
      
       let res = await req.json();
       return res;
    }
    
  }

}  





