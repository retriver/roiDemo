package com.roi.springboot.demo.job;

 
import java.time.LocalDateTime; 
 
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


/**
 *  [001-batch] 
 *     @Scheduled  ���� :   https://kms0209.tistory.com/69
 *      ThreadPool ���� SchedulerConfig.java  @Configuration  �ּ����� 
 */ 
@Component
public class Scheduler {

	@Scheduled(cron = "0/3 * * * * ?")
	public void cronJobSch() {
		log("cronJobSch");
	}

	// fixedDelay 
	@Scheduled(fixedDelay = 1000) 
	public void scheduleFixedDelayTask() {
		log("scheduleFixedDelayTask");
	}   

	// fixedRate
	@Scheduled(fixedRate = 2000)
	public void scheduleFixedRateTask() {
		log("scheduleFixedRateTask");
	}
	
	private void log(String logId) {	  
		System.out.println(" [ " + LocalDateTime.now().toString() + " ] "+ logId + "  Thread id : " + Thread.currentThread().getName() );
	}

}