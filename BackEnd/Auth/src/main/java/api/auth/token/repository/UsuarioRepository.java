package api.auth.token.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import api.auth.token.model.Usuario;

/**
 * @author Wellington Rodrigues
 *
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	
	@Query("select u from Usuario u where u.login = ?1")
	Usuario findUserByLogin(String login);
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "update usuario set token = ?1 where login = ?2")
	void atualizaTokenUsuario(String token, String login);
	
	@Query("select u from Usuario u where u.nome like %?1% ")
	List<Usuario> findUserByNome(String nome);

}
