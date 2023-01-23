package api.auth.token.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import api.auth.token.service.ImplementacaoUserDetailService;

/**
 * @author Wellington Rodrigues
 *
 */

@Configuration
@EnableWebSecurity
public class WebConfigSecurity extends WebSecurityConfigurerAdapter {

	@Autowired
	private ImplementacaoUserDetailService implementacaoUserDetailService;

	// Configura as solicitações de acesso por http
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		/*Ativando a proteção por usuarios que não estão autenticado por token*/
		http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
		
		/*Ativando permissão para acesso a pagina inicial do sistema*/
		.disable().authorizeRequests().antMatchers("/").permitAll()
		.antMatchers("/index").permitAll()
		
		/*Liberando cors para clientes web*/
		.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
		
		/*Url de Logout do sistema*/
		.anyRequest().authenticated().and().logout().logoutSuccessUrl("/index")
		
		/*Mapeia a url de logout e invalida o usuario*/
		.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
		
		/*Filtra requisicoes de login para autenticar*/
		.and().addFilterBefore(new JWTLoginFilter("/login", authenticationManager()), UsernamePasswordAuthenticationFilter.class)
		
		/*Filtra demais requisicoes para verificar a presenca do token jwt no header http*/
		.addFilterBefore(new JWTApiAutenticacaoFilter(), UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		// Service que irá consultar o user no banco
		auth.userDetailsService(implementacaoUserDetailService)

				// Padão de codificacao de senha
				.passwordEncoder(new BCryptPasswordEncoder());
	}

}
