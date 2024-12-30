public with sharing class AccountClass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getContacts(String searchText) {
        try {
          
            if (String.isEmpty(searchText)) {
             return [SELECT Id, Name FROM Account];
} 
 
            else {
                // If not empty, search with pattern
                String searchPattern = '%'+ searchText +'%'; 
                return [SELECT Id, Name FROM Account WHERE NAME LIKE :searchPattern];
            }
        } catch (Exception e) {
            // Catch any exception and throw a handled exception
            throw new AuraHandledException(e.getMessage());
        }
    }
      
      @AuraEnabled(cacheable=true)
       public Static List<Contact> getAccountContacts(String accountId){

      try{
      return[SELECT Id , Name FROM Contact WHERE accountId=:accountId];
      } 
      catch (Exception e) {
            // Catch any exception and throw a handled exception
            throw new AuraHandledException(e.getMessage());
        }
    }
}
