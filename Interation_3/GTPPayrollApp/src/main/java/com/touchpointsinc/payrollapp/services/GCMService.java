package com.touchpointsinc.payrollapp.services;

public interface GCMService {
	void sendCloudMessage(String clientTokenId, String message);
}