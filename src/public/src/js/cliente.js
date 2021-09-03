window.addEventListener('load', function() {
    lista(function(){
       jv.datatable(['list']);
    });
 })
 
 var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop3'), {
   keyboard: false
 })
 
 async function lista(callback){
    let res = await jv.Ajax('GET',null,'/listacliente');
    if(res){
       jv.injecthtml(res,'lista');
    } 
    callback();
 }
 
 $('.phone_with_ddd').mask('(00) 00000-0000');
 $('.rg').mask('99.999.999-9'); 
 //$('.cpf').mask('000.000.000-00', {reverse: true});
 
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
 
 
 
 async function deleteCliente(id,obj){
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
         let res = jv.Ajax('GET',id,'/deleteCliente?');
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
 
 async function getInfoCliente(id){
    let res = await jv.Ajax('GET',id,'/getinfocliente?');
    if(res){
       jv.insert('nome',res.nome);
       jv.insert('cpf',res.cpf);
       jv.insert('rg',res.rg);
       jv.insert('endereco',res.endereco);
       jv.insert('numcasa',res.numcasa);
       jv.insert('phone_with_ddd',res.celular);
       jv.insert('nascido',res.nascido);
       jv.insert('mail',res.email);
       jv.insert('pass',res.senha);
       jv.insert('edi',res.id);
    }
 }
 
 async function add_ou_edit(){
    let nome = jv.qs('nome');
    let email = jv.qs('mail');
    let senha = jv.qs('pass');
    let cpf = jv.qs('cpf');
    let rg = jv.qs('rg');
    let oemi = jv.qs('oemi');
    let endereco = jv.qs('endereco');
    let numCasa = jv.qs('numcasa');
    let cell = jv.qs('phone_with_ddd');
    let nascimento = jv.qs('nascido');
   
   
    let id = (jv.qs('edi')) ? jv.qs('edi'): 'null';
    let url = (tipo == "Adicionar Cliente") ? '/addcliente' : '/editcliente' ;
    if(jv.isvalid2({nome,cpf,rg,'Endereço':endereco,'Numero da Casa':numCasa,'Celular':cell,'Data Nascimento':nascimento,'E-mail':email,'Senha':senha,'Orgão Emissor':oemi})){
       let dados = jv.formData({nome,cpf,rg,endereco,numCasa,cell,nascimento,email,senha,oemi,id});
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
 