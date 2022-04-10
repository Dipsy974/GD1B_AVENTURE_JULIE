class shop_scene extends Phaser.Scene {
    constructor() {
        
        super("shop_scene");
    }

    init(data){ this.positionX = data.x;
        this.positionY = data.y; 
        this.hpData = data.hp; 
        this.currencyData = data.currency;
        this.dirData = data.dir;
        this.hasBatonData = data.baton;
        this.hasBonbonsData = data.bonbons;
        this.hasHacheData = data.hache;
        this.hasEdelweissData = data.edelweiss;
        this.hasGeleeData = data.gelee; 
        this.questGivenData = data.quest;
        this.recetteGivenData = data.recette;
        this.animsData = data.anims; 
    }

    preload() {
        this.load.spritesheet('chara_idle', 'assets/chara_idle.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chara_idle_unarmed', 'assets/chara_idle_unarmed.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chara_idle_axe', 'assets/chara_idle_axe.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chara_run', 'assets/chara_run.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chara_run_axe', 'assets/chara_run_axe.png',
            { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('chara_run_unarmed', 'assets/chara_run_unarmed.png',
            { frameWidth: 256, frameHeight: 256 });

        this.load.image("TileSet", "assets/tileset_v0_extruded.png");
        this.load.tilemapTiledJSON("shop_map", "epicerie_map.json");
        this.load.image('hitbox', 'assets/hitbox.png');

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
        
        const shop_map = this.add.tilemap("shop_map");
        const tileset = shop_map.addTilesetImage("tileset_v0", "TileSet", 256, 256, 1, 2);
       

        const ground = shop_map.createLayer(
            "ground",
            tileset
            ); 
        const tapis = shop_map.createLayer(
                "tapis",
                tileset
                ); 
        const solid = shop_map.createLayer(
            "solid",
            tileset
            ); 
        const intoVillage = shop_map.createLayer(
            "intoVillage",
            tileset
            ); 
       
        const notCollide = shop_map.createLayer(
            "notCollide",
            tileset
            ); 
       
        

      

        solid.setCollisionByExclusion(-1, true); 
        intoVillage.setCollisionByExclusion(-1, true); 
       

        

        this.dialogActive = false; 
        this.currentDialog = ["",""]; 
        this.stepDialog = 0; 

        this.player = this.physics.add.sprite(this.positionX, this.positionY, 'chara_idle');
        this.player.setBounce(0.2);
        this.player.setScale(0.7);
        this.player.setDepth(1);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(140, 130);
        this.player.body.setOffset(55, 110);
        this.player.speed = 500; 
        this.player.hp = this.hpData;
        this.player.isAttacking = false; 
        this.player.dir = this.dirData; 
        this.player.questGiven = this.questGivenData; 
        this.player.recetteGiven = this.recetteGivenData;
        this.player.currentAnims = this.animsData; 
        this.player.inShop = true;

        //Objets possédés
        this.player.hasBaton = this.hasBatonData; 
        this.player.hasHache = this.hasHacheData; 
        this.player.hasBonbons = this.hasBonbonsData; 
        this.player.hasEdelweiss = this.hasEdelweissData; 
        this.player.hasGelee = this.hasGeleeData; 


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

        this.cursors = this.input.keyboard.createCursorKeys();



 
  
        this.physics.add.collider(this.player, solid);
        this.physics.add.collider(this.player, intoVillage, this.changeScenetoVillage, null, this);
      
   
        //Initialisation de la caméra et des limites de jeu
        this.cameras.main.setBounds(-320, 0, 1280, 1280);
        this.cameras.main.zoom = 0.7;
        this.physics.world.setBounds(0, 0, 1280, 1300);
        //Mise en place de la caméra qui le joueur nouvellement créé
        this.cameras.main.startFollow(this.player);
       
        

        //PNJ

        this.npcs = this.physics.add.group();
        this.vendeuse = this.npcs.create(575, 256, 'vendeuse');;
        this.vendeuse.setPushable(false); 
        this.vendeuse.setCollideWorldBounds(false);
        this.vendeuse.body.setSize(140, 130);
        this.vendeuse.body.setOffset(55, 110);
        this.vendeuse.dialogues = [["Tu as du mal à te décider mon garçon ?","Reviens me voir quand tu sauras ce qui te \nfera plaisir !"],
        ["Des bonbons à l'Edelweiss ?","Malheureusement ils ont été victimes de leur \nsuccès !","Mais si tu y tiens vraiment, tu peux me rapporter \nl'ensemble des ingrédients.","Il me faut une gelée de chenille royale,\net une fleur d'Edelweiss."],
        ["Parfait tu as tout trouvé !","Voilà, des délicieux bonbons concoctés avec \namour.","N'oublie pas de bien te laver les dents !"],
        ["N'oublie pas de bien te laver les dents !"]]; 
        this.vendeuseHitbox = this.physics.add.sprite(this.vendeuse.x, this.vendeuse.y, 'hitbox');
        this.vendeuseHitbox.setScale(0.7);
        this.vendeuseHitbox.setSize(400, 400);
        this.vendeuseHitbox.setOffset(-50,300);
        

        this.physics.add.overlap(this.player, this.vendeuseHitbox, this.interactionVendeuse, null, this);
        this.physics.add.collider(this.player, this.vendeuse);


        //UI

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
        this.currencyText = this.add.text(-170, 80, "x " + this.player.currency, {fontFamily: "Custom", fontSize: '60px', color:"white" });
        this.currencyText.setScrollFactor(0);
        this.currencyText.setDepth(10);
        this.ui_dialogue = this.add.image(220, 650, "dialogueBox").setOrigin(0,0).setScale(1.3);
        this.ui_dialogue.setScrollFactor(0);
        this.ui_dialogue.setDepth(10);
        this.dialogueText = this.add.text(250, 700, 'Dialogue ici', { fontFamily: "Custom", fontSize: '40px', color:"black"});
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


        this.attackHitBox.setVisible(false); 
        if(!this.dialogActive){
            controlPlayer(this.player, this.cursors, this.attackHitBox); 
            this.attackHitBox.x  = this.player.x;
            this.attackHitBox.y  = this.player.y;
        }
        else{
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
        

            //UPDATE POSITION ACCORDING TO NPCS
            this.npcs.children.each(function(npc) {

                if(this.player.y < npc.y){
                    npc.setDepth(2);
                }else{
                    npc.setDepth(0);
                }
                 
             }, this);


            

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

    changeScenetoVillage(player, trigger){

        this.scene.start("village_scene", {
            x : 1700, 
            y : 1100, 
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

    interactionVendeuse(player, npc){
        this.ui_button.setVisible(true); 

        if(!this.dialogActive){
            const isEJustDown = Phaser.Input.Keyboard.JustDown(this.keyE);
            if(isEJustDown && !this.dialogActive){
                if(this.player.hasBonbons){
                    this.discussion(this.vendeuse.dialogues[3]);
                    
                }
                else if(this.player.hasEdelweiss && this.player.hasGelee){
                    this.discussion(this.vendeuse.dialogues[2]);
                    this.player.hasBonbons = true; 
                    this.player.hasEdelweiss = false;
                    this.player.hasGelee = false;
                    this.ui_gelee.setVisible(false);
                    this.ui_edelweiss.setVisible(false);
                    this.ui_bonbons.setVisible(true); 
                }
                else if(this.player.questGiven){
                    this.discussion(this.vendeuse.dialogues[1]);
                    this.player.recetteGiven = true; 
                }
                else{ 
                    this.discussion(this.vendeuse.dialogues[0]);
                } 
            }
        }
    }

    discussion(dialogue){
        this.currentDialog = dialogue;
        this.dialogActive = true;     
    }
  
};
