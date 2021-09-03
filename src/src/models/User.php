<?php
namespace src\models;

use core\Database;
use \core\Model;

class User extends Model {

    public $db;
    public function __construct()
    {
        $this->db = Database::getInstance();
    }
    
    public function getUserToken($token){
       
        $sql = "SELECT * FROM users WHERE token = :token";
        $sql = $this->db->prepare($sql);
        $sql->bindValue(':token',$token);
        $sql->execute();

        return  $sql->fetchAll();
    }

    public function getUserName($nome) {

        $sql = "SELECT * FROM users WHERE nome = :nome";
        $sql = $this->db->prepare($sql);
        $sql->bindValue(':nome',$nome);
        $sql->execute();

        return $sql->fetch();
    }

    public function saveToken($token,$nome) {
        
        $sql = "UPDATE users SET token = :token WHERE nome = :nome";
        $sql = $this->db->prepare($sql);
        $sql->bindValue(':token',$token);
        $sql->bindValue(':nome',$nome);
        $sql->execute();
    }
}