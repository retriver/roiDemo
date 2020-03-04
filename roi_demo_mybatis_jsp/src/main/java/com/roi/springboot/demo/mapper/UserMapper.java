package com.roi.springboot.demo.mapper;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface UserMapper {

    public List<Map<String, Object>> readUserList();
    //데이터 베이스에 글 등록
	public int insertBBS(Map map);
	//전체 글 목록 가져오기
	public List<Map<String, Object>> selectList(Map map);
	//글 목록 하나 가져오기
	public Map<String, Object> selectOne(int no);
	//step 숫자 업데이트하기
	public int updateStep(Map map);
	//전체 글 개수 가져오기
	public int selectTotalRecord();
	//수정, 삭제할 글의 비밀번호 가져오기
	public int selectPassword(Map map);
	//수정 완료하기
	public int updateRecord(Map map);
	//삭제 완료하기
	public int deleteRecord(Map map);
	//댓글 입력하기
	public int insertComment(Map map);
	//댓글 가져오기
	public List selectCommentList(Map map);
	//댓글 삭제하기
	public int deleteComment(Map map);
	//댓글 비밀번호 확인하기
	public int confirmCommentPwd(Map map);
	//댓글 수정하기
	public int updateComment(Map map);
}