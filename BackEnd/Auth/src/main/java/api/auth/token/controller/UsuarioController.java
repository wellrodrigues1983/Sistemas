package api.auth.token.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.auth.token.model.Usuario;
import api.auth.token.repository.UsuarioRepository;

/**
 * @author Wellington Rodrigues
 *
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@GetMapping(value = "/{id}", produces = "application/json")
	@CacheEvict(value = "cacheuserid", allEntries = true) // remove cache não utilizado
	@CachePut("cacheuserid") // atualiza o cache com mudanças de put
	public ResponseEntity<Usuario> usuarioPorId(@PathVariable(value = "id") Long id) {

		Optional<Usuario> usuario = usuarioRepository.findById(id);

		if (usuario != null) {
			return new ResponseEntity<Usuario>(usuario.get(), HttpStatus.OK);
		} else {
			System.out.println("Id: " + id);
		}
		return null;
	}

	@GetMapping(value = "/", produces = "application/json")
	@CacheEvict(value = "cacheuserall", allEntries = true) // remove cache não utilizado
	@CachePut("cacheuserall") // atualiza o cache com mudanças de put
	public ResponseEntity<List<Usuario>> todosUsuarios() {

		List<Usuario> list = usuarioRepository.findAll();

		return new ResponseEntity<List<Usuario>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/usuarioPorNome/{nome}", produces = "application/json")
	@CacheEvict(value = "usuarioPorNome", allEntries = true) // remove cache não utilizado
	@CachePut("usuarioPorNome") // atualiza o cache com mudanças de put
	public ResponseEntity<List<Usuario>> usuarioPorNome(@PathVariable("nome") String nome) {

		List<Usuario> list = usuarioRepository.findUserByNome(nome);

		return new ResponseEntity<List<Usuario>>(list, HttpStatus.OK);
	}

	@PostMapping(value = "/criar", produces = "application/json")
	public ResponseEntity<Usuario> salvarUsuario(@RequestBody Usuario usuario) {

		String pswCripto = new BCryptPasswordEncoder().encode(usuario.getSenha());
		usuario.setSenha(pswCripto);

		Usuario usuariosalvar = usuarioRepository.save(usuario);

		return new ResponseEntity<Usuario>(usuariosalvar, HttpStatus.OK);

	}

	@PutMapping(value = "/atualizar", produces = "application/json")
	public ResponseEntity<Usuario> editarUsuario(@RequestBody Usuario usuario) {

		Usuario usertemp = usuarioRepository.findUserByLogin(usuario.getLogin());

		if (!usertemp.getSenha().equals(usuario.getSenha())) {/* Senhas diferentes na atualizacao */
			String pswCripto = new BCryptPasswordEncoder().encode(usuario.getSenha());
			usuario.setSenha(pswCripto);
		}

		Usuario usuariosalvar = usuarioRepository.save(usuario);

		return new ResponseEntity<Usuario>(usuariosalvar, HttpStatus.OK);

	}

	@DeleteMapping(value = "/delete/{id}", produces = "application/text")
	public String deletarUsuario(@PathVariable("id") Long id) {

		usuarioRepository.deleteById(id);

		return "Ok";

	}

}
