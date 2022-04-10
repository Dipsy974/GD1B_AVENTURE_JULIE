class forest_scene extends Phaser.Scene {
    constructor() {
        
        super("forest_scene");
    }

    init(data){ this.positionX = data.x;
        this.positionY = data.y;
        this.hpData = data.hp; 
        this.scoreData = data.score;
        this.dirData = data.dir;
        this.currencyData = data.currency;
        this.hasBatonData = data.baton;
        this.hasBonbonsData = data.bonbons;
        this.hasHacheData = data.hache;
        this.hasEdelweissData = data.edelweiss;
        this.hasGeleeData = data.gelee; 
        this.questGivenData = data.quest; 
        this.recetteGivenData = data.recette;
        this.animsData = data.anims; 
        ; }

    preload() {
        this.load.spritesheet('chara_idle', 'assets/chara_idle.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chara_idle_unarmed', 'assets/chara_idle_unarmed.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chara_idle_axe', 'assets/chara_idle_axe.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chara_run', 'assets/chara_run.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('ronce', 'assets/ronce_spritesheet.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chara_run_axe', 'assets/chara_run_axe.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chara_run_unarmed', 'assets/chara_run_unarmed.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('attack_anim', 'assets/attack_spritesheet.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('coin', 'assets/coin_spritesheet.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chenille', 'assets/chenille_walk.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chenille_gold', 'assets/chenille_gold_walk.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('jelly_quest', 'assets/jelly_quest.png',
            { frameWidth: 256, frameHeight: 256 });
        

        this.load.image("TileSet", "assets/tileset_v0_extruded.png");
        this.load.tilemapTiledJSON("forest_map", "forest_map.json")

        this.load.image('buche', 'assets/buche.png');
        this.load.image('buche_hache', 'assets/buche_hache.png');
        this.load.image('beam', 'assets/beam.png');
        this.load.image('ronce_dead', 'assets/ronce_dead.png'); 
        this.load.image('jelly_vie', 'assets/jelly_vie.png');
        this.load.image('hitbox', 'assets/hitbox.png');
        this.load.image('hitboxAttack', 'assets/hitboxAttack.png');
        this.load.image('hacheUI', 'assets/hache.png');
        this.load.image('batonUI', 'assets/baton.png');
        this.load.image('bucheron', 'assets/bucheron.png');
        this.load.image('vendeuse', 'assets/vendeuse.png');
        this.load.image('copine', 'assets/copine.png');
        this.load.image('edelweissUI', 'assets/UI_edelweiss.png');
        this.load.image('geleeUI', 'assets/UI_jelly.png');
        this.load.image('bonbonsUI', 'assets/UI_bonbons.png');
        this.load.image('coinsUI', 'assets/UI_coin.png');
        this.load.image('barre', 'assets/UI_barre.png');
        this.load.image('hp1', 'assets/hp_1.png');
        this.load.image('hp2', 'assets/hp_2.png');
        this.load.image('hp3', 'assets/hp_3.png');
        this.load.image('dialogueBox', 'assets/dialogue_box.png');
        this.load.image('interactionButton', 'assets/interactionButton.png');
    }
    create() {

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        
        const forest_map = this.add.tilemap("forest_map");
        const tileset = forest_map.addTilesetImage("tileset_v0", "TileSet", 256, 256, 1, 2);
       

        const ground = forest_map.createLayer(
            "ground",
            tileset
            ); 
        const decor_terre = forest_map.createLayer(
                "decor_terre",
                tileset
                ); 
        const solid2 = forest_map.createLayer(
            "solid2",
            tileset
            ); 
        const solid = forest_map.createLayer(
            "solid",
            tileset
            ); 
        const intoVillage = forest_map.createLayer(
            "intoVillage",
            tileset
            ); 
        
        const notCollide = forest_map.createLayer(
            "notCollide",
            tileset
            ); 
       
        

      

        solid.setCollisionByExclusion(-1, true); 
        solid2.setCollisionByExclusion(-1, true); 
        intoVillage.setCollisionByExclusion(-1, true); 
        notCollide.setDepth(3); 

  

        this.dialogActive = false; 
        this.currentDialog = ["",""]; 
        this.stepDialog = 0;

        this.player = this.physics.add.sprite(this.positionX, this.positionY, 'chara_idle');
        this.player.setBounce(0.2);
        this.player.setScale(0.7);
        this.player.setDepth(1);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(140, 130);
        this.player.body.setOffset(55, 120);
        this.player.speed = 500; 
        this.player.hp = this.hpData;
        this.player.invincible = false;
        this.player.dir = this.dirData; 
        this.player.questGiven = this.questGivenData; 
        this.player.recetteGiven = this.recetteGivenData;
        this.player.currentAnims = this.animsData; 
        this.player.inShop = false;

        //Objets possédés
        this.player.hasBaton = this.hasBatonData; 
        this.player.hasHache = this.hasHacheData; 
        this.player.hasBonbons = this.hasBonbonsData; 
        this.player.hasEdelweiss = this.hasEdelweissData; 
        this.player.hasGelee = this.hasGeleeData; 

        this.player.isAttacking = false; 

        this.player.currency = this.currencyData; 
        

        this.attackHitBox = this.physics.add.sprite(this.player.x, this.player.y, 'hitbox');
        this.attackHitBox.setScale(0.7);
        this.attackHitBox.setSize(2, 2);
        this.attackHitBox.setOffset(50,70);
  
        //ANIM PERSO IDLE SANS BATON
        this.anims.create({
            key: 'idle_down',
            frames: [{ key: 'chara_idle_unarmed', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'idle_up',
            frames: [{ key: 'chara_idle_unarmed', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'idle_left',
            frames: [{ key: 'chara_idle_unarmed', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'idle_right',
            frames: [{ key: 'chara_idle_unarmed', frame: 1 }],
            frameRate: 20
        });
        //ANIM PERSO IDLE AVEC BATON
        this.anims.create({
            key: 'idle_down_baton',
            frames: [{ key: 'chara_idle', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'idle_up_baton',
            frames: [{ key: 'chara_idle', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'idle_left_baton',
            frames: [{ key: 'chara_idle', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'idle_right_baton',
            frames: [{ key: 'chara_idle', frame: 1 }],
            frameRate: 20
        });
        //ANIM PERSO IDLE AVEC HACHE
        this.anims.create({
            key: 'idle_down_axe',
            frames: [{ key: 'chara_idle_axe', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'idle_up_axe',
            frames: [{ key: 'chara_idle_axe', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'idle_left_axe',
            frames: [{ key: 'chara_idle_axe', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'idle_right_axe',
            frames: [{ key: 'chara_idle_axe', frame: 1 }],
            frameRate: 20
        });
        //ANIM PERSO SANS BATON
        this.anims.create({
            key: 'run_right',
            frames: this.anims.generateFrameNumbers('chara_run_unarmed', { start: 12, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run_up',
            frames: this.anims.generateFrameNumbers('chara_run_unarmed', { start: 6, end: 9 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'run_left',
            frames: this.anims.generateFrameNumbers('chara_run_unarmed', { start: 18, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run_down',
            frames: this.anims.generateFrameNumbers('chara_run_unarmed', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        //ANIM PERSO AVEC BATON
        this.anims.create({
            key: 'run_right_baton',
            frames: this.anims.generateFrameNumbers('chara_run', { start: 12, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run_up_baton',
            frames: this.anims.generateFrameNumbers('chara_run', { start: 6, end: 9 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'run_down_baton',
            frames: this.anims.generateFrameNumbers('chara_run', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'run_left_baton',
            frames: this.anims.generateFrameNumbers('chara_run', { start: 18, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
        //ANIM PERSO AVEC HACHE
        this.anims.create({
            key: 'run_right_axe',
            frames: this.anims.generateFrameNumbers('chara_run_axe', { start: 12, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run_up_axe',
            frames: this.anims.generateFrameNumbers('chara_run_axe', { start: 6, end: 9 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'run_down_axe',
            frames: this.anims.generateFrameNumbers('chara_run_axe', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'run_left_axe',
            frames: this.anims.generateFrameNumbers('chara_run_axe', { start: 18, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

         //Anim attack hitbox
         this.anims.create({
            key: 'attack_up',
            frames: this.anims.generateFrameNumbers('attack_anim', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'attack_left',
            frames: this.anims.generateFrameNumbers('attack_anim', { start: 4, end: 7 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'attack_down',
            frames: this.anims.generateFrameNumbers('attack_anim', { start: 8, end: 11 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'attack_right',
            frames: this.anims.generateFrameNumbers('attack_anim', { start: 12, end: 15 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'no_attack',
            frames: [{ key: 'hitbox', frame: 0 }],
            frameRate: 20
        });
        //Anim ronce
          this.anims.create({
            key: 'wiggle',
            frames: this.anims.generateFrameNumbers('ronce', { start: 0, end: 7 }),
            frameRate: 5,
            repeat: -1
        });
        //ANIM PIECES
        this.anims.create({
            key: 'coin_levitate',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        //ANIM CHENILLE
        this.anims.create({
            key: 'chenille_left',
            frames: this.anims.generateFrameNumbers('chenille', { start: 4, end: 7 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'chenille_right',
            frames: this.anims.generateFrameNumbers('chenille', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'chenille_up',
            frames: this.anims.generateFrameNumbers('chenille', { start: 12, end: 15 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'chenille_down',
            frames: this.anims.generateFrameNumbers('chenille', { start: 8, end: 11 }),
            frameRate: 12,
            repeat: -1
        });
        //ANIM CHENILLE GOLD
        this.anims.create({
            key: 'chenille_gold_left',
            frames: this.anims.generateFrameNumbers('chenille_gold', { start: 4, end: 7 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'chenille_gold_right',
            frames: this.anims.generateFrameNumbers('chenille_gold', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'chenille_gold_up',
            frames: this.anims.generateFrameNumbers('chenille_gold', { start: 12, end: 15 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'chenille_gold_down',
            frames: this.anims.generateFrameNumbers('chenille_gold', { start: 8, end: 11 }),
            frameRate: 12,
            repeat: -1
        });
        //ANIM GELEE
        this.anims.create({
            key: 'jelly_move',
            frames: this.anims.generateFrameNumbers('jelly_quest', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();


        //----------------------CLASSE ENNEMI -----------------------------------
        var Enemy = new Phaser.Class({
            Extends: Phaser.Physics.Arcade.Sprite,
            initialize:
                 
            function Enemy (scene, x, y, isSpecial, target)
            {
                //INITIALISE L'ENNEMI AVEC PARAMETRES DIFFERENTS EN FONCTION DEL'INFO TROUVE DANS TILED
                if(isSpecial){
                    Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, "chenille_gold");
                    this.isSpecial = true;
                    this.animsSet = ["chenille_gold_down","chenille_gold_up","chenille_gold_left","chenille_gold_right"];
                }else{
                    Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, "chenille");
                    this.isSpecial = false;
                    this.animsSet = ["chenille_down","chenille_up","chenille_left","chenille_right"];
                }
                
                // PROPRIETES ENNEMIS
                this.allDirection = ["up", "right", "left", "down"];
                this.direction = "right"; 
                this.hp = 3; 
                this.target = target; 
                this.compteur = 120; 
                this.speed = 100; 
                this.isInvincible = false; 
                this.anims.play(this.animsSet[3]);
                
                //PATTERN ALEATOIRE
                scene.time.addEvent({
                    delay: 2000,
                    callback: () => {
                        if(this.hp> 2){
                            this.direction = this.allDirection[Phaser.Math.Between(0,3)]; 
                        }
                    },
                    loop: true
                })
            },

            preUpdate: function (time, delta)
            {
                
                this.body.setSize(140, 100);
                this.body.setOffset(70, 80);

                switch (this.direction){
                    case "right":
                        this.setVelocity(this.speed, 0);
                        
                        this.anims.play(this.animsSet[3],true);
                        break;
                    case "left":
                        this.setVelocity(-this.speed, 0);
                        this.anims.play(this.animsSet[2],true);
                        break;
                    case "up":
                        this.setVelocity(0, -this.speed);
                        this.setSize(100,150);
                        this.anims.play(this.animsSet[1],true);
                        break;
                    case "down":
                        this.setVelocity(0, this.speed);
                        this.anims.play(this.animsSet[0],true);
                        this.setSize(100,150);
                        this.body.setOffset(70, 110);
                        break;
                }

                //SUIT LE JOUEUR SI PREND DES DEGATS
                if(this.hp < 3){
                    this.speed = 150; 
                    if(this.x < this.target.x && this.y > this.target.y){
                        this.direction = "right";
                    }
                    if(this.x > this.target.x && this.y > this.target.y){
                        this.direction = "up";
                    }
                    if(this.x < this.target.x && this.y < this.target.y){
                        this.direction = "down";
                    }
                    if(this.x > this.target.x && this.y < this.target.y){
                        this.direction = "left";
                    }
                }
                
                //FRAME INVULNERABLE
                if(this.isInvincible){
                    this.compteur-- ;
                    if(this.compteur <= 0){
                            this.compteur = 120;
                            this.setTint(0xffffff);
                            this.isInvincible = false ;
                        }
                }    

            }
        });
          //----------------------FIN CLASSE ENNEMI -----------------------------------



        this.enemies = this.physics.add.group({ allowGravity: false, collideWorldBounds: true });

       
        
        this.physics.add.collider(this.enemies, solid);
        this.physics.add.collider(this.enemies, solid2);
        this.physics.add.collider(this.player, this.enemies, this.touchEnemy, null, this);
        
        this.physics.add.overlap(this.attackHitBox, this.enemies, this.hurtEnemy, null, this);
        
        
        forest_map.getObjectLayer('enemies').objects.forEach((enemy) => {
            this.enemies.add(new Enemy(this, enemy.x, enemy.y, enemy.properties[0].value, this.player), true);

        });


        


        this.beam = this.physics.add.sprite(1000, 500, 'beam').setScale(2.5).setDepth(5);

        this.buche = this.physics.add.sprite(1024, 1024, 'buche_hache').setScale(1.6);
        this.buche.setPushable(false); 
        this.buche.body.setSize(250, 100);
        this.buche.body.setOffset(0, 50);
        this.bucheHitbox = this.physics.add.sprite(this.buche.x, this.buche.y, 'hitbox');
        this.bucheHitbox.setSize(500, 300);
        this.bucheHitbox.setOffset(-150,0);

        this.physics.add.overlap(this.player, this.bucheHitbox, this.obtainAxe, null, this);
        this.physics.add.collider(this.player, this.buche);
        


        this.coins = this.physics.add.group({ allowGravity: false, collideWorldBounds: true });
        forest_map.getObjectLayer('lathunasse').objects.forEach((thunasse) => {
            const coin = this.coins.create(thunasse.x, thunasse.y, 'thunasse').setOrigin(0);
            coin.setOffset(115,115); 
            coin.anims.play("coin_levitate");

        });

        this.physics.add.collider(this.player, this.coins, this.collectCoin, null, this);

        this.jellysHp = this.physics.add.group({ allowGravity: false, collideWorldBounds: true });
        forest_map.getObjectLayer('lavie').objects.forEach((vie) => {
            const heart = this.hearts.create(vie.x, vie.y,'jelly_vie').setOrigin(0);

        });
        this.physics.add.collider(this.player, this.jellysHp, this.getHp, null, this);

        this.ronces = this.physics.add.group({ allowGravity: false, collideWorldBounds: true });
        
        forest_map.getObjectLayer('lesronces').objects.forEach((rc) => {
            const rand = Phaser.Math.Between(0,3);
            const ronce = this.ronces.create(rc.x, rc.y - rc.height/2 ,'ronce').setOrigin(0).setPushable(false);
            ronce.anims.play("wiggle", false, rand ); 
            ronce.setSize(140, 130);
            ronce.setOffset(55, 120);

        });

        this.physics.add.collider(this.player, this.ronces, this.touchEnemy, null, this);
        this.physics.add.collider(this.attackHitBox, this.ronces, this.hurtRonce, null, this);
        

        


        this.jellys = this.physics.add.group({ allowGravity: false, collideWorldBounds: true });
        this.physics.add.collider(this.player, this.jellys, this.obtainJelly, null, this);



        this.physics.add.collider(this.player, solid);
        this.physics.add.collider(this.player, solid2);
        this.physics.add.collider(this.player, intoVillage, this.changeScenetoVillage, null, this);
   
  

        //Initialisation de la caméra et des limites de jeu
        this.cameras.main.setBounds(0, 0, 5120, 7680);
        this.physics.world.setBounds(0, 0, 5120, 7680);
        this.cameras.main.zoom = 0.7;
        //Mise en place de la caméra qui le joueur nouvellement créé
        this.cameras.main.startFollow(this.player);


        //UI Placement
        this.ui_barre = this.add.image(-280, 50, "barre").setOrigin(0,0).setScale(1.4);
        this.ui_barre.setScrollFactor(0);
        this.ui_barre.setDepth(9);
        this.ui_baton = this.add.image(-210, 650, "batonUI").setOrigin(0,0).setScale(1.3).setVisible(this.player.hasBaton);
        this.ui_baton.setScrollFactor(0);
        this.ui_baton.setDepth(10);
        this.ui_hache = this.add.image(-210, 650, "hacheUI").setOrigin(0,0).setVisible(this.player.hasHache);
        this.ui_hache.setScrollFactor(0);
        this.ui_hache.setDepth(10);
        this.ui_edelweiss = this.add.image(200, 80, "edelweissUI").setOrigin(0,0).setScale(1.3).setVisible(this.player.hasEdelweiss);
        this.ui_edelweiss.setScrollFactor(0);
        this.ui_edelweiss.setDepth(10);
        this.ui_gelee = this.add.image(20, 80, "geleeUI").setOrigin(0,0).setScale(1.3).setVisible(this.player.hasGelee);
        this.ui_gelee.setScrollFactor(0);
        this.ui_gelee.setDepth(10);
        this.ui_bonbons = this.add.image(20, 80, "bonbonsUI").setOrigin(0,0).setScale(1.3).setVisible(this.player.hasBonbons);
        this.ui_bonbons.setScrollFactor(0);
        this.ui_bonbons.setDepth(10);
        this.ui_hp = this.add.image(-230, -110, "hp3").setOrigin(0,0).setScale(1.4);
        this.ui_hp.setScrollFactor(0);
        this.ui_hp.setDepth(10);
        this.ui_coin = this.add.image(-260, 65, "coinsUI").setOrigin(0,0).setScale(1.3);
        this.ui_coin.setScrollFactor(0);
        this.ui_coin.setDepth(10);
        this.currencyText = this.add.text(-170, 80, "x " + this.player.currency, { fontFamily: "Custom",fontSize: '60px', color:"white" });
        this.currencyText.setScrollFactor(0);
        this.currencyText.setDepth(10);
        this.ui_dialogue = this.add.image(220, 650, "dialogueBox").setOrigin(0,0).setScale(1.3);
        this.ui_dialogue.setScrollFactor(0);
        this.ui_dialogue.setDepth(10);
        this.dialogueText = this.add.text(250, 700, 'Dialogue ici', { fontFamily: "Custom", fontSize: '50px', color:"black"});
        this.dialogueText.setScrollFactor(0); 
        this.dialogueText.setDepth(11);
        this.ui_button = this.add.image(this.player.x, this.player.y, "interactionButton").setOrigin(0,0);
        this.ui_button.setDepth(10);
        this.ui_button.setVisible(false);
       
    }

    update() {

        this.ui_button.x = this.player.x + 50;
        this.ui_button.y = this.player.y;
        if(!this.player.body.wasTouching.none && this.player.body.touching.none){
            this.ui_button.setVisible(false); 
        }

        if(!this.dialogActive){
            controlPlayer(this.player, this.cursors,this.attackHitBox); 
            this.attackHitBox.x  = this.player.x;
            this.attackHitBox.y  = this.player.y;

            if(this.player.hasBaton || this.player.hasHache){
                
                if(this.player.isAttacking){
                    this.attackHitBox.setVisible(true); 
                    if(this.player.dir == "up"){
                        this.attackHitBox.y = this.player.y - 70;
                        this.attackHitBox.setSize(140, 200);
                        this.attackHitBox.setOffset(this.player.width/4 - 10, 50);
                    }
                    if(this.player.dir == "down"){
                        this.attackHitBox.y = this.player.y + 100;
                        this.attackHitBox.setSize(140, 130);
                        this.attackHitBox.setOffset(this.player.width/4 - 10 , 70); 
                    }
                    if(this.player.dir == "left"){
                        this.attackHitBox.x = this.player.x - 70;
                        this.attackHitBox.setSize(140, 130);
                        this.attackHitBox.setOffset(50, this.player.width/4 + 45); 
                    }
                    if(this.player.dir == "right"){
                        this.attackHitBox.x = this.player.x + 70;
                        this.attackHitBox.setSize(140, 130);
                        this.attackHitBox.setOffset(50, this.player.width/4 + 45 ); 
                    }
                }else{
                    this.attackHitBox.setSize(2, 2);
                    this.attackHitBox.setVisible(false); 
                    this.attackHitBox.setOffset(this.player.width/2,this.player.width/2);
                    this.attackHitBox.anims.play('no_attack');  
                }
            }

        }else{
            this.player.setVelocity(0,0);
            if(this.player.dir == "down"){
                this.player.anims.play('idle_down'); 
            }
            else if(this.player.dir == "up"){
                this.player.anims.play('idle_up');
            }
            else if(this.player.dir == "left"){
                this.player.anims.play('idle_left');
            }
            else if(this.player.dir == "right"){
                this.player.anims.play('idle_right');
            }
        }
        
      
    
        //POSITION PAR RAPPORT A LA BUCHE
        if(this.player.y < this.buche.y){
            this.buche.setDepth(2);
        }else{
            this.buche.setDepth(0);
        }


        if(this.dialogActive){
            const isEJustDown = Phaser.Input.Keyboard.JustDown(this.keyE);
            this.dialogueText.setAlpha(1); 
            this.ui_dialogue.setAlpha(1);
            this.dialogueText.setText(this.currentDialog[this.stepDialog]);
            if(isEJustDown){
                if(this.stepDialog < this.currentDialog.length-1){
                    this.stepDialog +=1;  

                }else{
                    this.dialogActive = false; 
                    this.stepDialog = 0;
                }
            }
        }
        else{
            this.dialogueText.setAlpha(0); 
            this.ui_dialogue.setAlpha(0);
        }


        //Vie joueur
        if(this.player.hp == 3){
            this.ui_hp.setTexture("hp3");
        }
        if(this.player.hp == 2){
            this.ui_hp.setTexture("hp2");
        }
        if(this.player.hp == 1){
            this.ui_hp.setTexture("hp1");
        }
        if(this.player.hp < 1){
            this.die(); 
        }
        
    }

    touchEnemy(player, enemy) {
        if(!player.invincible){
            player.invincible = true;

            player.hp -= 1;
            player.setTint(0xff0000);
            this.cameras.main.shake(200, 0.01);
        }
             
    }

    hurtEnemy(hitbox, enemy){

        if(!enemy.isInvincible){
            enemy.hp -= 1;
            enemy.isInvincible = true;
            enemy.setTint(0xff0000);
            if(enemy.hp < 1){
                enemy.destroy();
                if(enemy.isSpecial){
                    var jelly = this.jellys.create(enemy.x, enemy.y, 'jelly_quest');
                    jelly.setSize(20,20);
                    jelly.anims.play("jelly_move"); 
                }else{
                    const rand = Phaser.Math.Between(0,9);
                    if(rand > 1){
                        var jellyHp = this.jellysHp.create(enemy.x, enemy.y, 'jelly_vie');
                        jellyHp.setSize(20,20);
                    } 
                }
            }
        }
           
    }

    die(){
        this.scene.start("village_scene", {
            x : 1200, 
            y : 1300, 
            score: this.score, 
            hp: 3,
            dir : "down", 
            currency : this.player.currency,
            baton: this.player.hasBaton,
            edelweiss: this.player.hasEdelweiss,
            hache: this.player.hasHache,
            bonbons: this.player.hasBonbons,
            gelee: this.player.hasGelee,
            quest : this.player.questGiven,
            anims : this.player.currentAnims
        
        });           
    }


    hurtRonce(hitbox, enemy){
        if(this.player.hasHache){
            this.physics.add.sprite(enemy.x + 128, enemy.y + 128, 'ronce_dead');
            enemy.destroy();       
        }
    }

  
    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.start("village_scene");

    }

    collectCoin(player, coin){
        coin.destroy(); 
        this.player.currency += 1; 
        this.currencyText.setText('x' + this.player.currency);
    }

    getHp(player, jelly){
        jelly.destroy(); 
        this.player.hp += 1; 
    }

    obtainJelly(player, jelly){
        jelly.destroy(); 
        this.player.hasGelee = true; 
        this.ui_gelee.setVisible(true); 
    }

    changeScenetoVillage(player, trigger){

        this.scene.start("village_scene", {
            x : 440, 
            y : 1380, 
            score: this.score, 
            hp: this.player.hp,
            dir : this.player.dir, 
            currency : this.player.currency,
            baton: this.player.hasBaton,
            edelweiss: this.player.hasEdelweiss,
            hache: this.player.hasHache,
            bonbons: this.player.hasBonbons,
            gelee: this.player.hasGelee,
            quest : this.player.questGiven,
            recette: this.player.recetteGiven,
            anims : this.player.currentAnims
        
        });
    }

    obtainAxe(player, axe){
        if(!this.player.hasHache){
            this.ui_button.setVisible(true); 

        const isEJustDown = Phaser.Input.Keyboard.JustDown(this.keyE);
                if(isEJustDown){
                    
                    this.buche.y += 2; 
                    this.buche.setTexture("buche"); 
                    this.discussion(["Vous avez trouvé une hâche"]);
                    this.player.hasHache = true; 
                    this.ui_hache.setVisible(true); 
                    this.ui_baton.setVisible(false); 
                    this.player.hasBaton = false
                    this.player.currentAnims = ["run_left_axe","run_up_axe","run_right_axe","run_down_axe","idle_left_axe","idle_up_axe","idle_right_axe","idle_down_axe"];
                }
        }
        
    }

    discussion(dialogue){
        this.currentDialog = dialogue;
        this.dialogActive = true;     
    }
};
