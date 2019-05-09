package com.roi.springboot.demo.controller;
 
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
  
import com.roi.springboot.demo.domain.Hello;
import com.roi.springboot.demo.domain.Param;
import com.roi.springboot.demo.response.JSONResponse;

@RestController
@RequestMapping(value = "/rest")
public class DemoRestController {

	private static final Logger LOG = LoggerFactory.getLogger ( DemoRestController.class );	  
	    
    @GetMapping()
    public Hello get() {
        return new Hello(0, "Hello Spring Boot!");
    }
    
    @PostMapping()
    public Hello post(@RequestBody Param param) {
        String msg = "Data1 : " + param.getData1() + ", Data2 : " + param.getData2();
        Hello hello = new Hello(0, msg);
        return hello;
    }
        
    //  Parameter 
    // http://localhost:8080/hello/args?msg=m1&msg2=m2
    @GetMapping("args")
    public Hello getArgs(
            @RequestParam(value = "msg")String msg,
            @RequestParam(value = "msg2")String msg2) {
        Hello hello = new Hello(0, msg);
        hello.setMsg(hello.getMsg() + ", " + msg2);

        return hello;
    }    
    
    //   Parameter 
    //  http://localhost:8080/hello/argsDefault?msg=m1
    @GetMapping("argsDefault")
    public Hello getArgsDefault(
            @RequestParam(value = "msg")String msg,
            @RequestParam(value = "msg2", required = false, defaultValue = "msg2Default")String msg2) {
        Hello hello = new Hello(0, msg);
        hello.setMsg(hello.getMsg() + ", " + msg2);

        return hello;
    }
    //  get  JSONResponse
    // http://localhost:8080/hello/jsonResponse?msg=11
    @GetMapping("jsonResponse")
    public JSONResponse<Hello> getJsonResponse(
            @RequestParam(value = "msg")String msg) {
        Hello hello = new Hello(0, msg);

        JSONResponse<Hello> response = new JSONResponse<Hello>();
        response.setCode(0);
        response.setMsg("message ");
        response.setData(hello);

        return response;
    }
    
}

