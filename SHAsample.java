
import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException; 

public class SHAsample {
	private static String getFileChecksum(MessageDigest digest, File file) throws IOException
	{
	    //Get file input stream for reading the file content
	    FileInputStream fis = new FileInputStream(file);
	     
	    //Create byte array to read data in chunks
	    byte[] byteArray = new byte[1024];
	    int bytesCount = 0; 
	      
	    //Read file data and update in message digest
	    while ((bytesCount = fis.read(byteArray)) != -1) {
	        digest.update(byteArray, 0, bytesCount);
	    };
	     
	    //close the stream
	    fis.close();
	     
	    //Get the hash's bytes
	    byte[] bytes = digest.digest();
	     
	    //This bytes[] has bytes in decimal format;
	    //Convert it to hexadecimal format
	    StringBuilder sb = new StringBuilder();
	    for(int i=0; i< bytes.length ;i++)
	    {
	        sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
	    }
	     
	    //return complete hash
	   return sb.toString();
	}
	
	public static void main(String args[]) throws NoSuchAlgorithmException, IOException {
		File file = new File("C:\\Users\\Jacob\\Desktop\\results.txt");//input directory path to file you wish to hash
		MessageDigest SHA2Digest = MessageDigest.getInstance("SHA-256");//creating a message digest based on the SHA256 standard
		System.out.println("SHA2-256 of file:" + getFileChecksum(SHA2Digest, file));//making a call to getFileChecksum
	}

}
