var database = {
    createdb :function(){
        var connect={};
        try{
            if (!window.openDatabase) { 
                 alert('not supported'); 
            } 
            else { 
              connect = window.openDatabase("dreamdb", "1.0", "Dream Register", 5000000);
             }
         }
        catch(e){ 
            console.log(e);
            if (e.code === 18) {
              connect = null;
            } 
        }
        
        if (connect === null) {    
            connect = storage.openDatabase("dreamdb", "1.0", "Dream Register", 5000000);
         }
        config.prototype.dbinstance = connect;        
        connect.transaction(database.createTable, database.errorDB, database.successDB);
    },
    
    createTable : function(db){
         config.prototype.dbinstance.transaction(function(tx){
         tx.executeSql('DROP TABLE IF EXISTS USERS');
         tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (id unique, name, img, gender, location, rel)');
      });
    },
    
    errorDB : function(err){
        console.log(err);
    },
    
    successDB :function(){
        console.log("Successfully Created.");
    },
    
    insertIntoValues :function(){
        var data = config.prototype.mybasicinfo;  
            config.prototype.dbinstance.transaction(function(tx){
               tx.executeSql('INSERT INTO USERS (id, name, img, gender, location, rel) VALUES ("1233","Achintya Kar","fg","http://graph.facebook.com/560276319/picture","M")', [],
                    function(tx, result) {
                        console.log("Inserted successsfully");
                    },
                    function(tx, error) {
                        console.log(tx,error);
                    });  
                });
       
    },
    
    insertValues :function(data){
        try {
            config.prototype.dbinstance.transaction(function(tx) {
                tx.executeSql('INSERT INTO USERS (id, name, img, gender, location, rel)' + data, [],
                    function(tx, result) {
                        console.log("Rows Inserted successsfully");
                    },
                    function(tx, error) {
                        console.log(tx,error);
                    });  
            });
        }
        catch (e) {
            console.log("Error in Insertion");
        }
       
    },
    
    localdbselect :function(searchtext){
         config.prototype.dbinstance=window.openDatabase("dreamdb", "1.0", "Dream Register", 5000000);
         config.prototype.dbinstance.transaction(function(tx){
            tx.executeSql('SELECT * FROM USERS WHERE name LIKE \''+searchtext+'%\'', [],
                function(tx, result) {
                    var _results = [];
                    config.prototype.searchUsers=[];
                    console.log("result rows");
                    console.log(result.rows.length);
                    for (var i = 0; i < result.rows.length; i++) {
                        var _result = {};
                        for (key in result.rows.item(i)) {
                            _result[key] = result.rows.item(i)[key];
                        }
                        _results.push(_result);
                        
                        config.prototype.searchUsers.push(_result);
                    }
                    localStorage.setItem('dbselectflag', true);
                    utility.displayfriend();
                },
                function(tx, error) {

                });   
         }); 
    }				  
}