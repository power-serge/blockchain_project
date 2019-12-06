import org.bouncycastle.jcajce.provider.digest.SHA3;
import org.bouncycastle.util.encoders.Hex;
import java.security.MessageDigest;  
import java.security.NoSuchAlgorithmException; 
import java.io.*;



public class SHA {
	
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
	     
	    //close the stream; We don't need it now.
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
		
		File file1 = new File("C:\\Users\\Jacob\\Desktop\\CheckSumTest.txt");
		File file2 = new File("C:\\Users\\Jacob\\Desktop\\results.txt");
		SHA3.DigestSHA3 digestSHA3 = new SHA3.Digest256();
		
		//Writes a string an arbitrary amount of times to a file based on i 
		try (Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file1), "utf-8"))) {
			for(int i = 0; i < 10000000; i++) {
				writer.write("Hello, my name is jacob.");//string that is written to the text used for the hashing algorithm
			}
		}
		
		
		long startTime = System.currentTimeMillis();
		System.out.println("SHA3-256 of file1:" + getFileChecksum(digestSHA3, file1));
		long stopTime1 = System.currentTimeMillis();
		long runTime1 = stopTime1 - startTime;
		System.out.println("Run time " + runTime1);
		
		
		//write results to file
		try {
			FileWriter fstream = new FileWriter(file2, true);
			BufferedWriter out = new BufferedWriter(fstream);
			out.write((int) runTime1 + "\n");
			out.close();
		}catch(Exception e) {
			System.out.println("error while writing to file");
		}
		
		
//		System.out.println("SHA3-256 of file2:" + getFileChecksum(digestSHA3, file2));
//		long stopTime2 = System.currentTimeMillis();
//		long runTime2 = stopTime2 - startTime;
//		System.out.println("Run time " + runTime2);
//		
//		System.out.println("SHA3-256 of file3:" + getFileChecksum(digestSHA3, file3));
//		long stopTime3 = System.currentTimeMillis();
//		long runTime3 = stopTime3 - startTime;
//		System.out.println("Run time " + runTime3);
	}
}
