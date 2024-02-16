public class Demo2 {
    
	public String helloWorldString;                // Instance Member Variable
    private static final String DEFAULT_STRING;    // Static Member Variable
    
    // Static Initializer Block
    static{
        DEFAULT_STRING = 'Hello World';
    }
    
    //Constructor
    public Demo2(){
        this(DEFAULT_STRING);
    }
    
    // Overloaded Constructor
    public Demo2(String stringToDisplay){
        this.helloWorldString = stringToDisplay;
    }
    
    // method
    public void printOutput(){  
        System.debug('Display Text ' + helloWorldString);
    }
    
    public static void printOutput1(){                         // Static Method
        System.debug('Display Static method');
    }
    
    
}