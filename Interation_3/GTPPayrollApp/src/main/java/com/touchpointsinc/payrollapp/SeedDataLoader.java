package com.touchpointsinc.payrollapp;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;

import com.touchpointsinc.payrollapp.representations.PlanCost;

public class SeedDataLoader {
	public static void main(String[] args) {
    	
        String csvFile = "D:\\share_drive\\1-Projects\\GTP_Benefit_Calc\\Seed_data\\medical_plan_cost.csv";
        String line = "";
        String cvsSplitBy = ",";

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {

            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] planCost = line.split(cvsSplitBy);

                System.out.println("Age Range: " + planCost[0] + "\n" +
                		           "Cost1: " + planCost[1] + "\n" +
                		           "Cost16: " + planCost[16] + "\n"
                		           );

            }
            
            PlanCost planCost = new PlanCost();
            planCost.setPlanId(101);
            planCost.setMinAge(0);
            planCost.setMaxAge(20);
            planCost.setCost(new BigDecimal(20.55));
                       
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}