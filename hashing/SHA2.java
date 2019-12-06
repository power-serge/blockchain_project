import java.security.MessageDigest;  
import java.security.NoSuchAlgorithmException; 
import java.io.*;

public class SHA2 {

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
			
			File file1 = new File("C:\\Users\\Jacob\\Desktop\\CheckSumTest.txt");
			File file2 = new File("C:\\Users\\Jacob\\Desktop\\results.txt");
			
			MessageDigest SHA2Digest = MessageDigest.getInstance("SHA-256");//creating a message digest based on the SHA256 standard
			
			//Writes a string an arbitrary amount of times to a file based on i 
			try (Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file1), "utf-8"))) {
				for(int i = 0; i < 100000000; i++) {
					writer.write("Hello, my name is jacob.");//string that is written to the text used for the hashing algorithm
				}
			}
			
			//calculating the time efficiency of the SHA2
			long startTime = System.currentTimeMillis();//Initializing start time 
			System.out.println("SHA2-256 of file:" + getFileChecksum(SHA2Digest, file1));//making a call to getFileChecksum
			long stopTime1 = System.currentTimeMillis();//Initializing stop time once the hash has been generated
			long runTime1 = stopTime1 - startTime;//finding the run time of the process
			System.out.println("Run time:" + runTime1);//output runtime
			
			//write results to file
			try {
				FileWriter fstream = new FileWriter(file2, true);
				BufferedWriter out = new BufferedWriter(fstream);
				out.write((int) runTime1 + "\n");
				out.close();
			}catch(Exception e) {
				System.out.println("error while writing to file");
			}
			
			
//		System.out.println("SHA2-256 of file2:" + getFileChecksum(SHA2Digest, file2));
//			long stopTime2 = System.currentTimeMillis();
//			long runTime2 = stopTime2 - startTime;
//			System.out.println("Run time " + runTime2);
//			
//			System.out.println("SHA2-256 of file3:" + getFileChecksum(SHA2Digest, file3));
//			long stopTime3 = System.currentTimeMillis();
//			long runTime3 = stopTime3 - startTime;
//			System.out.println("Run time " + runTime3);
			}
}
