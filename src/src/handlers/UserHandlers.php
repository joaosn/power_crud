<?php
namespace src\handlers;

use \src\models\User;

class UserHandlers {

    public $user;
    
    public function __construct()
    {
        $this->user = new User; 
    }

    public function checkLogin() {
        if(!empty($_SESSION['token'])) {
            $token = $_SESSION['token'];
            
            $data = $this->user->getUserToken($token);
            $dat = $data[0];
            
            if($dat && count($dat) > 0) {
               $loggedUser = new User();
               $loggedUser->id = $dat['id'];
               $loggedUser->nome = $dat['nome'];

               return $loggedUser;
            }    

        }

       return false;
    }

    public function verifyLogin($nome, $senha) {
        
        $user = $this->user->getUserName($nome);
        if(!empty($user)) {
            if($user['tipo_user'] != 1){
                return 'sem dash';
            }

            if(password_verify($senha, $user['senha'])) {
                $token = md5(time().rand(0,9999).time());
                $this->user->saveToken($token,$nome);
                return $token;
            }

          return false;
        }
    }
}