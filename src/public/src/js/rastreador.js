window.addEventListener('load', function() {
    lista(function(){
       jv.datatable(['list']);
    });
 })
 
 var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop3'), {
   keyboard: false
 })
 
 async function lista(callback){
    let res = await jv.Ajax('GET',null,'/listarastreador');
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
 
 
 
 async function deleteRastreador(id,obj){
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
         let res = jv.Ajax('GET',id,'/deleteRastreador?');
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
 
 async function getinfoRastreador(id){
    let res = await jv.Ajax('GET',id,'/getinfoRastreador?');
    if(res){
       jv.insert('imei',res.imei);
       jv.insert('forn',res.fornecedor);
       jv.insert('fab',res.fabricante);
       jv.insert('modelo',res.modelo);
       jv.insert('edi',res.id);
    }
 }
 
 async function add_ou_edit(){
    let imei   = jv.qs('imei');
    let forn   = jv.qs('forn');
    let fab    = jv.qs('fab');
    let modelo = jv.qs('modelo');
    let id = (jv.qs('edi')) ? jv.qs('edi'): 'null';
    let url = (tipo == "Adicionar Rastreador") ? '/addRastreador' : '/editRastreador' ;
    if(jv.isvalid2({imei,'Fornecedor':forn,'Fabricante':fab,modelo})){
       let dados = jv.formData({imei,forn,fab,modelo,id});
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
 