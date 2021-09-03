var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop3'), {
   keyboard: false
 })

window.addEventListener('load', function() {
    lista(function(){
       jv.datatable(['list']);
    });
 })

 async function lista(callback){
    let res = await jv.Ajax('GET',null,'/listaveiculo');
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
 
 
 
 async function deleteVeiculo(id,obj){
   Swal.fire({
      title: 'Tem certeza?',
      text: "Esse Veiculo Sera Deletado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
         let trpai = obj.parentNode.parentNode;
         let res = jv.Ajax('GET',id,'/deleteVeiculo?');
         if(res){
         $(trpai).hide(200);
          Swal.fire(
            'Deleted!',
            'Veiculo Foi Deletado!.',
            'success'
          )
          lista(function(){jv.datatable(['list']);});
         }else{
            jv.suporte();
         }
      }
    })
 }
 
 async function getinfoVeiculo(id){
    console.log(id);
    let res = await jv.Ajax('GET',id,'/getInfoVeiculo?');
    if(res){
       jv.insert('nome',res.dono);
       jv.insert('marca',res.marca);
       jv.insert('ano',res.ano);
       jv.insert('placa',res.placa);
       jv.insert('cor',res.cor);
       jv.insert('edi',res.edi);
    }
 }
 
 async function add_ou_edi(){
    //--veiculo
    let placa    = jv.qs('placa');
    let chassis  = jv.qs('chassis');
    let renavam  = jv.qs('renavam');
    let cor      = jv.qs('cor');
    let marca    = jv.qs('marca');
    let modelocar= jv.qs('modelocar');
    let ano      = jv.qs('ano');
    let ano2     = jv.qs('ano2');
    let alienado = jv.qs('alienado');
    let categoria= jv.qs('categoria');
    let propi    = jv.qs('propi');
    let document = jv.qs('document');
    //---------

    //--associado
    let idcliente = jv.qs('nomeA');
    //----------
    
    //--rastreador
    let idrastreador = jv.qs('imeiR');
    //-----------

    //--chip
    let idchip  = jv.qs('tell');
    //------

    //--instalador
    let idInstalador = jv.qs('nomeinst');
    //------------
    //let idi = jv.qs('idi');
    let id = (jv.qs('edi')) ? jv.qs('edi'): 'null';
    let url = (tipo == "Adicionar Veiculo") ? '/addveiculo' : '/editveiculo' ;
    if(jv.isvalid2({
      'Placa':placa,    
      'Chassis':chassis,  
      'Renavam':renavam,  
      'Cor':cor,      
      'Marca':marca,    
      'Modelo Carro':modelocar,
      'Ano Modelo':ano,      
      'Ano Fabricação':ano2,     
      'Alienado':alienado, 
      'Categoria':categoria,
      'Proprietario':propi,    
      'Documento':document,
      'Associado Nome':idcliente,
      'Imei':idrastreador,
      'Chip Linha':idchip,
      'Instalador Nome':idInstalador
    })){
       let dados = jv.formData({placa,chassis,renavam,cor,marca,modelocar,ano,ano2,alienado,categoria,propi,document,idcliente,idrastreador,idchip,idInstalador,id});
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
 