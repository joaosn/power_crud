window.addEventListener('load', function() {
    lista(function(){
       jv.datatable(['list']);
    });
 })

 $('.cpf').mask('000.000.000-00', {reverse: true});
 
 var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop3'), {
   keyboard: false
 })
 
 async function lista(callback){
    let res = await jv.Ajax('GET',null,'/listaInstalador');
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
 
 
 
 async function deleteInstalador(id,obj){
   Swal.fire({
      title: 'Tem certeza?',
      text: "Esse Instalador Sera Deletado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
         let trpai = obj.parentNode.parentNode;
         let res = jv.Ajax('GET',id,'/deleteInstalador?');
         if(res){
         $(trpai).hide(200);
          Swal.fire(
            'Deleted!',
            'Instalador Foi Deletado!.',
            'success'
          )
          lista(function(){jv.datatable(['list']);});
         }else{
            jv.suporte();
         }
      }
    })
 }
 
 async function getinfoInstalador(id){
    console.log(id);
    let res = await jv.Ajax('GET',id,'/getInfoInstalador?');
    if(res){
      jv.insert('nome'     ,res.nome);
      jv.insert('cpf'      ,res.cpf);
      jv.insert('edi'      ,res.id);
    }
 }
 
 async function add_ou_edi(){
    let nome      = jv.qs('nome'); 
    let cpf       = jv.qs('cpf');      
    let id        = (jv.qs('edi')) ? jv.qs('edi'): 'null';
    let url       = (tipo == "Adicionar Instalador") ? '/addInstalador' : '/editInstalador' ;
    if(jv.isvalid2({nome,cpf})){
       let dados = jv.formData({nome,cpf,id});
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
 