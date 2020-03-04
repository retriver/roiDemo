package com.roi.springboot.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.roi.springboot.demo.mapper.UserMapper;

@org.springframework.web.bind.annotation.RestController
public class RestController {

	@Autowired
	UserMapper userMapper;



	//처음 코멘트 가져오기
	@ResponseBody
	@RequestMapping("/firstComment")
	public List<Map> firstComment(@RequestParam Map map){
		return userMapper.selectCommentList(map);
	}
	//댓글 삭제
	@ResponseBody
	@RequestMapping("/commentDelete")
	public List<Map> commentDelete(@RequestParam Map map){
		boolean output = true;
		int pwd = userMapper.confirmCommentPwd(map);

		if(pwd==Integer.parseInt(map.get("pwd").toString())) {
			int delete = userMapper.deleteComment(map);
			if(delete ==1 ) return userMapper.selectCommentList(map);
		}
		else {
			return new Vector<Map>();
		}
		return userMapper.selectCommentList(map);
	}
	//댓글 수정
	@ResponseBody
	@RequestMapping("/commentUpdate")
	public List<Map> commentUpdate(@RequestParam Map map){
		//System.out.println(map);
		int pwd = userMapper.confirmCommentPwd(map);
		if(pwd==Integer.parseInt(map.get("pwd").toString())) {
			List<Map> edt = new Vector<Map>();
			Map edtMap = new HashMap();
			edtMap.put("edt", "ok");
			edt.add(edtMap);
			return edt;
		}
		else {
			return new Vector<Map>();
		}
	}
}
