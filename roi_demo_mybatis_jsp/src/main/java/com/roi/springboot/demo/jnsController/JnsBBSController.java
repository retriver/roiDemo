package com.roi.springboot.demo.jnsController;

import java.util.Map;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.roi.springboot.demo.common.Paging;
import com.roi.springboot.demo.mapper.UserMapper;

@Controller
public class JnsBBSController {
	private static final Logger LOG = LoggerFactory.getLogger ( JnsBBSController.class );

	@Value("${company.name}")
	private String companyName;

	@Value("${company.email}")
	private String companyEmail;

	@Value("${company.number}")
	private String companyNumber;

	@Autowired
	UserMapper userMapper;

	//답변형 게시판 페이지로 이동
	@RequestMapping("/jnsBBSList")
	public String bbsList(Model model, @RequestParam Map map) {
		//전체 글 개수 가져오기
		int totalRecordCount = userMapper.selectTotalRecord();
		int pageSize = 10;
		int blockPage = 3;
		int nowPage = map.get("nowPage")==null?1:Integer.parseInt(map.get("nowPage").toString());
		int start = totalRecordCount-(nowPage-1)*pageSize;
		int end = start-pageSize+1;
		map.put("start", start);
		map.put("end", end);
		//데이터 베이스에 저장되어 있는 글 목록 전체 가져오기
		model.addAttribute("bbsList", userMapper.selectList(map));
		String pagingString = Paging.pagingMethod(totalRecordCount, pageSize, blockPage, nowPage, "/jnsBBSList?");
		model.addAttribute("totalRecordCount", totalRecordCount);
		model.addAttribute("nowPage", nowPage);
		model.addAttribute("pageSize", pageSize);
		model.addAttribute("pagingString", pagingString);
		return "jnsBBS/jnsBBSIndex";
	}////////bbsList

	//작성 폼으로 이동
	@RequestMapping(value="/jnsInsertBBS", method = RequestMethod.GET)
	public String toInsertBBS(Model model) {
		return "jnsBBS/jnsWrite";
	}///////toInsertBBS

	//글 쓰기 로직
	@RequestMapping(value="/jnsInsertBBS", method = RequestMethod.POST)
	public String insertBBS(Model model,@RequestParam Map map) {
		//데이터 베이스에 insert
		int affected = userMapper.insertBBS(map);
		if(affected!=1) {
			model.addAttribute("notInsert", "<script>alert('글 등록이 되지 않았습니다.');</script>");
		}
		return "forward:/jnsBBSList";
	}/////////insertBBS

	//글 제목 선택해서 상세보기로 이동
	@RequestMapping("/jnsView")
	public String toView(@RequestParam Map map, Model model) {
		Map record = userMapper.selectOne(Integer.parseInt(map.get("no").toString()));
		record.put("content", record.get("content").toString().replaceAll("\r\n", "</br>"));
		//글 하나 영역에 저장
		model.addAttribute("record", record);
		return "jnsBBS/jnsView";
	}//////////toView

	//답변 폼으로 이동
	@RequestMapping("/jnsToReply")
	public String toReply(@RequestParam Map map, Model model) {
		model.addAttribute("no", map.get("no"));
		model.addAttribute("record", userMapper.selectOne(Integer.parseInt(map.get("no").toString())));
		return "jnsBBS/jnsReply";
	}//////////toReply

	//선택한 글에 답변하기
	@RequestMapping("/jnsReply")
	public String reply(@RequestParam Map map) {
		userMapper.updateStep(map);
		userMapper.insertBBS(map);
		return "forward:jnsBBSList";
	}/////////reply

	//수정 버튼 눌렀을 때
	@RequestMapping("/jnsToEdit")
	public String toEdit(@RequestParam Map map,Model model) {
		int dpwd = userMapper.selectPassword(map);
		int pwd = Integer.parseInt(map.get("pwd").toString());
		if(dpwd!=pwd) {
			model.addAttribute("WHERE", "EDT");
			model.addAttribute("SUCFAIL", 2);
			return "jnsBBS/jnsMessage";
		}
		else {
			int no = Integer.parseInt(map.get("no").toString());
			model.addAttribute("record", userMapper.selectOne(no));
			model.addAttribute("nowPage", map.get("nowPage"));
			return "jnsBBS/jnsEdit";
		}
	}////////toEdit

	//수정 완료 작업
	@RequestMapping("/jnsEdit")
	public String edit(@RequestParam Map map, Model model) {
		int update = userMapper.updateRecord(map);
		if(update==1) {
			model.addAttribute("WHERE", "EDT");
			model.addAttribute("SUCFAIL", 1);
			model.addAttribute("nowPage", map.get("nowPage"));
		}
		else {
			model.addAttribute("WHERE", "EDT");
			model.addAttribute("SUCFAIL", 0);
		}
		return "jnsBBS/jnsMessage";
	}////////edit

	//삭제작업
	@RequestMapping("/jnsDelete")
	public String delete(@RequestParam Map map, Model model) {
		int dpwd = userMapper.selectPassword(map);
		int pwd = Integer.parseInt(map.get("pwd").toString());
		if(dpwd!=pwd) {
			model.addAttribute("WHERE", "DEL");
			model.addAttribute("SUCFAIL", 2);
			return "jnsBBS/jnsMessage";
		}
		else {
			int delete = userMapper.deleteRecord(map);
			if(delete == 1) {
				model.addAttribute("WHERE", "DEL");
				model.addAttribute("SUCFAIL", 1);
				model.addAttribute("nowPage", map.get("nowPage"));
				return "jnsBBS/jnsMessage";
			}
			else {
				model.addAttribute("WHERE", "DEL");
				model.addAttribute("SUCFAIL", 0);
				return "jnsBBS/jnsMessage";
			}
		}
	}//////////delete
}