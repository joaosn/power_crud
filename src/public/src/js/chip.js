window.addEventListener('load', function() {
    lista(function(){
       jv.datatable(['list']);
    });
 })
 
 var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop3'), {
   keyboard: false
 })
 
 async function lista(callback){
    let res = await jv.Ajax('GET',null,'/listachip');
    if(res){
       jv.injecthtml(res,'lista');
    } 
    callback();
 }
 
 
 var tipo = '';
 function setTipo(v){
    tipo = v;
    let qt = jv.qsof('tt');
    for (let index = 0; index <= qt.length; index++) {
        if(!index){
         qt[index].innerHTML = tipo
        } 
    }
 }
 
 
 
 async function deletechip(id,obj){
   Swal.fire({
      title: 'Tem Certeza?',
      text: "Esse Cliente sera Deletado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
         let trpai = obj.parentNode.parentNode;
         let res = jv.Ajax('GET',id,'/deletechip?');
         if(res){
           $(trpai).hide(200);
           Swal.fire(
            'Deleted!',
            'Cliente foi deleted.',
            'success'
           )
           lista(function(){jv.datatable(['list']);});
         }else{
            jv.suporte();
         }
        
      }
   })
   
 }
 
 async function getinfochip(id){
    let res = await jv.Ajax('GET',id,'/getinfochip?');
    if(res){
       jv.insert('forn',res.fornecedor);
       jv.insert('linha',res.linha);
       jv.insert('oper',res.operadora);
       jv.insert('ccid',res.ccid);
       jv.insert('numero',res.numero);
       jv.insert('edi',res.id);
    }
 }
 
 async function add_ou_edit(){
    let linha   = jv.qs('linha');
    let forn   = jv.qs('forn');
    let oper    = jv.qs('oper');
    let ccid = jv.qs('ccid');
    let numero = jv.qs('numero');
    let id = (jv.qs('edi')) ? jv.qs('edi'): 'null';
    let url = (tipo == "Adicionar Chip") ? '/addchip' : '/editchip' ;
    if(jv.isvalid2({linha,'Fornecedor':forn,'Operadora':oper,ccid,numero})){
       let dados = jv.formData({linha,forn,oper,ccid,id,numero});
       let res = await jv.Ajax('POST',dados,url);
       if(res){
          Swal.fire(res.msg,'',res.icon);
          lista(function(){jv.datatable(['list']);});
          jv.limpaCampos();
          myModal.hide();
       }else{
          jv.suporte();
       }
 
    }
    
 }
 