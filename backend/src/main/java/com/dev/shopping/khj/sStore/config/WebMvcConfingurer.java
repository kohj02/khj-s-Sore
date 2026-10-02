package com.dev.shopping.khj.sStore.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*restapi:아키텍처의 원칙을 따르며 ,http통해 클라이언트와 백엔드가 자원을 주고 받을수있도록 방법이 정의된 api */
/*CORS:프론트엔드 쪽에서 서버의 api를 호출할떄, 브라우저가 보안을 위해 차단할지 말지 결정할지 결정하는 규칙 */
@Configuration
public class WebMvcConfingurer implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploString;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")// 모든 api 경로에 대해 CORS 허용
                .allowedOrigins("http://localhost:3000")// Reat 서버 경로
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")// 모든 요청메서드 허용설정
                .allowedHeaders("*")// 모든 요청 헤더 허용
                .allowCredentials(true);// 세션 쿠키 전달 허용
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // 백엔드 실행 시 콘솔에 찍히는 경로 확인
        String path = uploString.replace("\\", "/");
        if (!path.endsWith("/")) {
            path += "/";
        }

        // Windows 파일 시스템 접근 시 "file:///" (슬래시 3개)로 정확히 변환
        String resourcePath = "file:///" + path.replace("file:/", "").replace("file:///", "");

        System.out.println("==========================================");
        System.out.println("[REAL RESOURCE PATH] -> " + resourcePath);
        System.out.println("==========================================");

        registry.addResourceHandler("/upload/**")
                .addResourceLocations(resourcePath);
    }

}
