package com.roi.springboot.demo.jnsController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.roi.springboot.demo.mapper.UserMapper;

@org.springframework.web.bind.annotation.RestController
public class JnsRestController {

	@Autowired
	UserMapper userMapper;

	//댓글 입력
	@PostMapping("/jnsComment")
	public List<Map> comment(@RequestParam Map map) {
		int comment = userMapper.insertComment(map);
		if(comment==1) {
			List<Map> commentList = userMapper.selectCommentList(map);
			return commentList;
		}
		List<Map> commentList = userMapper.selectCommentList(map);
		return commentList;
	}/////////comment

	//댓글 수정
	@PutMapping("/jnsComment")
	public List<Map> updateComment(@RequestParam Map map){
		System.out.println(map);
		int update = userMapper.updateComment(map);
		if(update==1) {
			return userMapper.selectCommentList(map);
		}
		return userMapper.selectCommentList(map);
	}//////updateComment

	//처음 코멘트 가져오기
	@GetMapping("/jnsFirstComment")
	public List<Map> firstComment(@RequestParam Map map){
		return userMapper.selectCommentList(map);
	}//////firstComment

	//댓글 삭제
	@DeleteMapping("/jnsCommentDelete")
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
	}////////commentDelete

	//댓글 수정 전 비밀번호 확인
	@GetMapping("/jnsCommentUpdate")
	public List<Map> updateConfirmPassword(@RequestParam Map map){
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
	}//////updateConfirmPassword
}
