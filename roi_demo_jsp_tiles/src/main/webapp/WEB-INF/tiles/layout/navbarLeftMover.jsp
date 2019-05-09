<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation">
    <ul class="nav flex-column pl-1">
        <li class="nav-item"><a class="nav-link" href="dashboard?lang=ko">dashboard ko</a></li>
        <li class="nav-item"><a class="nav-link" href="dashboard?lang=en">dashboard en</a></li>
        
        
        <li class="nav-item"><a class="nav-link" href="dashboardMv">dashboard model</a></li>
        <li class="nav-item">
            <a class="nav-link" href="#submenu1" data-toggle="collapse" data-target="#submenu1">Reports</a>
            <ul class="list-unstyled flex-column pl-3 collapse" id="submenu1" aria-expanded="false">
               <li class="nav-item"><a class="nav-link" href="">Report 1</a></li>
               <li class="nav-item"><a class="nav-link" href="">Report 2</a></li>
            </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="card">card</a></li>
        <li class="nav-item"><a class="nav-link" href="palceholder">palceholder</a></li>
        <li class="nav-item"><a class="nav-link" href="table">table</a></li>
        <li class="nav-item"><a class="nav-link" href="tab">tab</a></li>
    </ul>
</div>
