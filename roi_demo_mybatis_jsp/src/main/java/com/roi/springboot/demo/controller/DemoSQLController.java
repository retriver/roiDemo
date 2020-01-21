package com.roi.springboot.demo.controller;

import java.util.List;
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
import org.springframework.web.bind.annotation.ResponseBody;

import com.roi.springboot.demo.common.Paging;
import com.roi.springboot.demo.mapper.UserMapper;





@Controller
public class DemoSQLController {
	private static final Logger LOG = LoggerFactory.getLogger ( DemoSQLController.class );


	@Value("${company.name}")
	private String companyName;

	@Value("${company.email}")
	private String companyEmail;

	@Value("${company.number}")
	private String companyNumber;

	@RequestMapping("/index")
	public String index() {
		return "index";
	}

	@Autowired
	UserMapper userMapper;

	@SuppressWarnings("rawtypes")
	@RequestMapping("/listJson")
	@ResponseBody
	public String userList( ) {
		List<Map<String, Object>> ret = userMapper.readUserList();
		return ((List) ret).toString();
	}

	@RequestMapping("/userList")
	public String userList(Model model) {
		model.addAttribute("userList", userMapper.readUserList());
		model.addAttribute("companyName", companyName);
		model.addAttribute("companyEmail", companyEmail);
		model.addAttribute("companyNumber", companyNumber);
		return "user_list";
	}
	//답변형 게시판 페이지로 이동
	@RequestMapping("/BBSList")
	public String bbsList(Model model, @RequestParam Map map) {
		//전체 글 개수 가져오기
		int totalRecordCount = userMapper.selectTotalRecord();
		int pageSize = 10;
		int blockPage = 3;
		int nowPage = map.get("nowPage")==null?1:Integer.parseInt(map.get("nowPage").toString());
		int start = totalRecordCount-(nowPage-1)*pageSize;
		int end = start-pageSize+1;
		//System.out.println("start"+start);
		//System.out.println("end"+end);
		map.put("start", start);
		map.put("end", end);
		//데이터 베이스에 저장되어 있는 글 목록 전체 가져오기
		model.addAttribute("bbsList", userMapper.selectList(map));
		//System.out.println("현재 페이지 :"+nowPage);
		String pagingString = Paging.pagingMethod(totalRecordCount, pageSize, blockPage, nowPage, "/BBSList?");
		model.addAttribute("totalRecordCount", totalRecordCount);
		model.addAttribute("nowPage", nowPage);
		model.addAttribute("pageSize", pageSize);
		model.addAttribute("pagingString", pagingString);
		return "BBSIndex";
	}
	//작성 폼으로 이동
	@RequestMapping(value="/insertBBS", method = RequestMethod.GET)
	public String toInsertBBS(Model model) {
		return "write";
	}
	//글 쓰기 로직
	@RequestMapping(value="/insertBBS", method = RequestMethod.POST)
	public String insertBBS(Model model,@RequestParam Map map) {
		//데이터 베이스에 insert
		int affected = userMapper.insertBBS(map);
		return "forward:/BBSList";
	}
	//글 제목 선택해서 상세보기로 이동
	@RequestMapping("/view")
	public String toView(@RequestParam Map map, Model model) {
		Map record = userMapper.selectOne(Integer.parseInt(map.get("no").toString()));
		record.put("content", record.get("content").toString().replaceAll("\r\n", "</br>"));
		//System.out.println(record);
		//글 하나 영역에 저장
		model.addAttribute("record", record);
		return "view";
	}
	//답변 폼으로 이동
	@RequestMapping("/toReply")
	public String toReply(@RequestParam Map map, Model model) {
		model.addAttribute("no", map.get("no"));
		model.addAttribute("record", userMapper.selectOne(Integer.parseInt(map.get("no").toString())));
		return "reply";
	}
	//선택한 글에 답변하기
	@RequestMapping("/reply")
	public String reply(@RequestParam Map map) {
		userMapper.updateStep(map);
		userMapper.insertBBS(map);
		return "forward:/BBSList";
	}
	//수정 버튼 눌렀을 때
	@RequestMapping("/toEdit")
	public String toEdit(@RequestParam Map map,Model model) {
		//System.out.println(map);
		int dpwd = userMapper.selectPassword(map);
		int pwd = Integer.parseInt(map.get("pwd").toString());
		if(dpwd!=pwd) {
			model.addAttribute("WHERE", "EDT");
			model.addAttribute("SUCFAIL", 2);
			return "message";
		}
		else {
			int no = Integer.parseInt(map.get("no").toString());
			model.addAttribute("record", userMapper.selectOne(no));
			model.addAttribute("nowPage", map.get("nowPage"));
			return "edit";
		}
	}
	//수정 완료 작업
	@RequestMapping("/edit")
	public String edit(@RequestParam Map map, Model model) {
		//System.out.println(map);
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
		return "message";
	}
	//삭제작업
	@RequestMapping("/delete")
	public String delete(@RequestParam Map map, Model model) {
		
		int dpwd = userMapper.selectPassword(map);
		int pwd = Integer.parseInt(map.get("pwd").toString());

		if(dpwd!=pwd) {
			model.addAttribute("WHERE", "DEL");
			model.addAttribute("SUCFAIL", 2);
			return "message";
		}
		else {
			int delete = userMapper.deleteRecord(map);
			if(delete == 1) {
				model.addAttribute("WHERE", "DEL");
				model.addAttribute("SUCFAIL", 1);
				model.addAttribute("nowPage", map.get("nowPage"));
				System.out.println("!111111");
				return "message";
			}
			else {
				model.addAttribute("WHERE", "DEL");
				model.addAttribute("SUCFAIL", 0);
				return "message";
			}
		}
	}

}