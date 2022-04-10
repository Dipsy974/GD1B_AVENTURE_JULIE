var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    scene: [menu,village_scene,forest_scene,shop_scene]
};
var game = new Phaser.Game(config);


compteur = 120;


function controlPlayer(player, cursors, attackHitbox){

    player.body.velocity.normalize()
  //DEPLACEMENTS ET ANIMATIONS JOUEUR
    if (cursors.up.isDown) {
        player.setVelocityY(-player.speed); 
        player.anims.play(player.currentAnims[1], true); 
        player.dir = "up";
        
    }
    else if (cursors.down.isDown) {       
        player.setVelocityY(player.speed); 
        player.anims.play(player.currentAnims[3], true); 
        player.dir = "down";     
    }
    else if (cursors.left.isDown) { 
        player.setVelocityX(-player.speed); 
        player.anims.play(player.currentAnims[0], true); 
        player.dir = "left";
    }
    else if (cursors.right.isDown) { 
        player.setVelocityX(player.speed); 
        player.anims.play(player.currentAnims[2], true); 
        player.dir = "right";
    }
    else {  // ANIMATIONS JOUEUR IDLE
        player.setVelocityX(0); 
        player.setVelocityY(0); 
        if(player.dir == "down"){
            player.anims.play(player.currentAnims[7]); 
        }
        else if(player.dir == "up"){
            player.anims.play(player.currentAnims[5]);
        }
        else if(player.dir == "left"){
            player.anims.play(player.currentAnims[4]);
        }
        else if(player.dir == "right"){
            player.anims.play(player.currentAnims[6]);
        }
        
    }  


    //ATTAQUE JOUEUR ET ANIMATION DE HITBOX
    const isAttackJustDown = Phaser.Input.Keyboard.JustDown(cursors.space);

    if (isAttackJustDown && !player.isAttacking && (player.hasBaton||player.hasHache) && !player.inShop) {
        player.isAttacking = true; 
        if(player.dir == "up"){
            attackHitbox.anims.play('attack_up');  
        }
        if(player.dir == "left"){
            attackHitbox.anims.play('attack_left');  
        }
        if(player.dir == "down"){
            attackHitbox.anims.play('attack_down');  
        }
        if(player.dir == "right"){
            attackHitbox.anims.play('attack_right');  
        }
        setTimeout(() => {
            player.isAttacking = false;
        }, 300);
    }
    
    //FRAME INVULNERABLE
    if(player.invincible){
        compteur-- ;
    if(compteur == 0){
            compteur = 120;
            player.setTint(0xffffff);
            player.invincible = false ;
        }
    }

   
}



