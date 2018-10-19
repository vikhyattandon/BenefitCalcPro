package com.touchpointsinc.payrollapp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * This is sample test to call Rest API from java
 * @author Willy
 *
 */
public class WillyTest2 {

	// http://localhost:8080/RESTfulExample/json/product/get
	public static void main(String[] args) {

	  try {

		URL url = new URL("http://localhost:8091/rest/planCosts");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Accept", "application/json");
		//conn.set

		if (conn.getResponseCode() != 200) {
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

	  } catch (NullPointerException | IOException e ) {
		e.printStackTrace();
	  } 
	}
}
