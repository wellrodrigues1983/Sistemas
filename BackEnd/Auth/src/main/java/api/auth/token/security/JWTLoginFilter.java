package api.auth.token.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;

import api.auth.token.model.Usuario;

/**
 * @author Wellington Rodrigues
 *
 */
/* Estabelece nosso gerenciador de token */
public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

	/**
	 * @param requiresAuthenticationRequestMatcher
	 */
	/* Configurando o gerenciador de autenticacao */
	protected JWTLoginFilter(String url, AuthenticationManager authenticationManager) {

		/* Obrigamos a autenticar a Url */
		super(new AntPathRequestMatcher(url));

		/* Gerenciador de autenticacao */
		setAuthenticationManager(authenticationManager);
	}

	/* Retorna o usuario ao processar a autenticacao */
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {

		/* Pegando o token pra validar */
		Usuario user = new ObjectMapper().readValue(request.getInputStream(), Usuario.class);

		/* Retorna o usuario login, senha e acessos */
		return getAuthenticationManager()
				.authenticate(new UsernamePasswordAuthenticationToken(user.getLogin(), user.getSenha()));
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {

		new JWTTokenAutenticacaoService().addAuthentication(response, authResult.getName());

	}

}
