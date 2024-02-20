package com.servlet.register;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/RegisterServlet")
public class  RegisterServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;
	private static final String INSERT_QUERY = "INSERT INTO users(fullname,address,phone,email,password) VALUES (?,?,?,?,?)";
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException{
		//get PrintWriter
		PrintWriter pw = res.getWriter();
		//content type (changes)
		res.setContentType("text/html");
		//read form values
		String fullname = req.getParameter("fullname");
		String address = req.getParameter("address");
		String phone = req.getParameter("phone");
		String email = req.getParameter("email");
		String password = req.getParameter("password");
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		try(Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/annapurnacaterers","root","root");
				PreparedStatement ps = con.prepareStatement(INSERT_QUERY);){
			
			ps.setString(1, fullname);
			ps.setString(2, address);
			ps.setString(3, phone);
			ps.setString(4, email);
			ps.setString(5, password);
			
			int count = ps.executeUpdate();
			
			if (count == 0) {
			    pw.println("<div id='registrationMessage' class='error-message'>Registration Failed</div>");
			} else {
			    res.sendRedirect("basiccontent.html");
			}


			
		}catch(SQLException se) {
			pw.println(se.getMessage());
			se.printStackTrace();
		}catch(Exception e) {
			pw.println(e.getMessage());
			e.printStackTrace();
		}
		
	
		
		pw.close();
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
		doGet(req, resp);
	}

}