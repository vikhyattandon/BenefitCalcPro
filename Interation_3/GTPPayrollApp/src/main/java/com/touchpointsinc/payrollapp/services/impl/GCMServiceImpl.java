package com.touchpointsinc.payrollapp.services.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import com.touchpointsinc.payrollapp.services.GCMService;

public class GCMServiceImpl implements GCMService {

	public static void main(String[] args) {
		String clientTokenId = "dQ4hGB-Xhzg:APA91bG1cmmKsBVtaTPoGhfBCV6gESNRs49kkZeQM1spYP4-WImg3JZQAkIF7wJmxQraKN9ItaPUSCNNLxNJa8eMTJWgXZ5OFvNbn1arCwbaxQcFXUR68lWtJI5zpw05eJWb9C8oKIQl";
		GCMService gcmService = new GCMServiceImpl();
		
		gcmService.sendCloudMessage(clientTokenId, "Willy-112");
	}
	
	public void sendCloudMessage(String clientTokenId, String message)  {
	  try {

		URL url = new URL("https://fcm.googleapis.com/fcm/send");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setDoOutput(true);
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setRequestProperty("Authorization", "key=AIzaSyC9-rKzmn1eXWlFL-FdCZ7dEuifz7OmaH4");
		
		//String input = "{\"id\":23,\"title\":\"my title\"}";
		/*String input1 = "{"
				//+ "\"to\": \"dQ4hGB-Xhzg:APA91bG1cmmKsBVtaTPoGhfBCV6gESNRs49kkZeQM1spYP4-WImg3JZQAkIF7wJmxQraKN9ItaPUSCNNLxNJa8eMTJWgXZ5OFvNbn1arCwbaxQcFXUR68lWtJI5zpw05eJWb9C8oKIQl\","
				+ "\"to\": \"" + clientTokenId + "\","
				+ "\"notification\":" 
				+	"{"
				+		"\"id\": 55,"
				+		"\"title\":\"my title\","
				+		"\"message\":\"message\","
				+		"\"instructions\":\"instructions\","
				+		"\"boldWords\" : \"Bold\""
				+	"},"
				+"\"priority\": 10"
			+"}";*/
		
		String input =
				"{"
						//+	"\"to\":\"dQ4hGB-Xhzg:APA91bG1cmmKsBVtaTPoGhfBCV6gESNRs49kkZeQM1spYP4-WImg3JZQAkIF7wJmxQraKN9ItaPUSCNNLxNJa8eMTJWgXZ5OFvNbn1arCwbaxQcFXUR68lWtJI5zpw05eJWb9C8oKIQl\","
						+ "\"to\": \"" + clientTokenId + "\","
						+	"\"data\":"
						+		"{\"id\":\"24\","
						+		 "\"title\":\"24\","
						+		 "\"message\":\"24\","
						+		 "\"instructions\":\"24\","
						+		 "\"boldWords\":\"24\""
						+		"}, "
						+	"\"notification\":"
						+		 	"{"
						+		 	 "\"body\":\"" + message + "\""
						+		 	"}," 
						+	"\"priority\": 10"
						+"}";
				
		System.out.println(message);
		OutputStream os = conn.getOutputStream();
		os.write(input.getBytes());
		os.flush();

		if (conn.getResponseCode() != HttpURLConnection.HTTP_CREATED &&
				conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
			throw new RuntimeException("Failed : HTTP error code : "
				+ conn.getResponseCode());
		}

		BufferedReader br = new BufferedReader(new InputStreamReader(
				(conn.getInputStream())));

		String output;
		System.out.println("Output from Server .... \n");
		while ((output = br.readLine()) != null) {
			System.out.println(output);
		}

		conn.disconnect();

	  } catch (MalformedURLException e) {

		e.printStackTrace();

	  } catch (IOException e) {

		e.printStackTrace();

	 }

	}
}
