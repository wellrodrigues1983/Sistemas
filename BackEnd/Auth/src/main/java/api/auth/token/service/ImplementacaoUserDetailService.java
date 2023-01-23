package api.auth.token.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import api.auth.token.model.Usuario;
import api.auth.token.repository.UsuarioRepository;

/**
 * @author Wellington Rodrigues
 *
 */
@Service
public class ImplementacaoUserDetailService implements UserDetailsService{
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		/*Consultar usuario no banco*/
		
		Usuario usuario = usuarioRepository.findUserByLogin(username);
		
		if (username == null) {
			throw new UsernameNotFoundException("Usuário não foi encontrado: " + username);
		}
		
		return new User(usuario.getLogin(), usuario.getPassword(), usuario.getAuthorities());
	}

}
