trigger phoneFieldCheck on Account (before insert) {
    if(trigger.isBefore && trigger.isInsert){
        if(!trigger.new.isEmpty()){
            for(Account acc:trigger.new){
                if(acc.Phone == null){
                    acc.Phone.addError('need to fill the phone field');
                }
            }
        }
        
    }
}